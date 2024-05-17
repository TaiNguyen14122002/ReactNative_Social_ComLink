import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Button, View, Alert } from 'react-native';
import { Video } from 'expo-av'; // Import Video component from expo-av
import { db } from '../components/firebase';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function CallScreen({ setScreen, screens, roomId }) {
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();
  const [isMuted, setIsMuted] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    startLocalStream();
  }, []);

  const startLocalStream = async () => {
    const isFront = true;

    const { status } = await Camera.requestPermissionsAsync(); // Request camera permissions

    if (status !== 'granted') {
      console.error('Permission to access camera was denied');
      return;
    }

    const facingMode = isFront ? 'front' : 'environment';
    const constraints = {
      audio: true,
      video: {
        minWidth: 500,
        minHeight: 300,
        minFrameRate: 30,
        facingMode,
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    setLocalStream(stream);
  };

  const startCall = async id => {
    const localPC = new RTCPeerConnection(configuration);
    localPC.addStream(localStream);

    const roomRef = await db.collection('rooms').doc(id);
    const callerCandidatesCollection = roomRef.collection('callerCandidates');
    localPC.onicecandidate = e => {
      if (!e.candidate) {
        console.log('Got final candidate!');
        return;
      }
      callerCandidatesCollection.add(e.candidate.toJSON());
    };

    localPC.onaddstream = e => {
      if (e.stream && remoteStream !== e.stream) {
        console.log('RemotePC received the stream call', e.stream);
        setRemoteStream(e.stream);
      }
    };

    const offer = await localPC.createOffer();
    await localPC.setLocalDescription(offer);

    const roomWithOffer = { offer };
    await roomRef.set(roomWithOffer);

    roomRef.onSnapshot(async snapshot => {
      const data = snapshot.data();
      if (!localPC.currentRemoteDescription && data.answer) {
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await localPC.setRemoteDescription(rtcSessionDescription);
      }
    });

    roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          await localPC.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    setCachedLocalPC(localPC);
  };

  const switchCamera = () => {
    localStream.getVideoTracks().forEach(track => track._switchCamera());
  };

  const toggleMute = () => {
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  const onBackPress = () => {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    setLocalStream();
    setRemoteStream();
    setCachedLocalPC();
    setScreen(screens.ROOM);
  };

  return (
    <>
      <Text style={styles.heading}>Call Screen</Text>
      <Text style={styles.heading}>Room: {roomId}</Text>

      <View style={styles.callButtons}>
        <View style={styles.buttonContainer}>
          <Button title="Click to stop call" onPress={onBackPress} />
        </View>
        <View style={styles.buttonContainer}>
          {!localStream && <Button title="Click to start stream" onPress={startLocalStream} />}
          {localStream && <Button title="Click to start call" onPress={() => startCall(roomId)} disabled={!!remoteStream} />}
        </View>
      </View>

      {localStream && (
        <View style={styles.toggleButtons}>
          <Button title="Switch camera" onPress={switchCamera} />
          <Button title={`${isMuted ? 'Unmute' : 'Mute'} stream`} onPress={toggleMute} disabled={!remoteStream} />
        </View>
      )}

      <View style={{ display: 'flex', flex: 1, padding: 10 }}>
        <View style={styles.rtcview}>
          {localStream && <Video style={styles.rtc} source={{ uri: localStream.toURL() }} />}
        </View>
        <View style={styles.rtcview}>
          {remoteStream && <Video style={styles.rtc} source={{ uri: remoteStream.toURL() }} />}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: 'center',
    fontSize: 30,
  },
  rtcview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    margin: 5,
  },
  rtc: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  toggleButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  callButtons: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    margin: 5,
  },
});