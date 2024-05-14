import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Button, View } from 'react-native';
import { Audio, Video } from 'expo-av';
import { db } from '../components/firebase';

const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function JoinScreen({ setScreen, screens, roomId }) {

  function onBackPress() {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    setLocalStream(null);
    setRemoteStream(null);
    setCachedLocalPC(null);
    // cleanup
    setScreen(screens.ROOM);
  }

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [cachedLocalPC, setCachedLocalPC] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    startLocalStream();
  }, []);

  const startLocalStream = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access audio is not granted');
      return;
    }

    const { status: cameraStatus } = await Video.requestCameraPermissionsAsync();
    if (cameraStatus !== 'granted') {
      console.error('Permission to access camera is not granted');
      return;
    }

    const audioStream = await Audio.getDeviceAudioRecordingPermission();
    const videoStream = await Video.getCameraPermissionsAsync();

    setLocalStream(audioStream);
  };

  const joinCall = async id => {
    const roomRef = await db.collection('rooms').doc(id);
    const roomSnapshot = await roomRef.get();

    if (!roomSnapshot.exists) return;
    const localPC = new RTCPeerConnection(configuration);
    localPC.addStream(localStream);

    const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
    localPC.onicecandidate = e => {
      if (!e.candidate) {
        console.log('Got final candidate!');
        return;
      }
      calleeCandidatesCollection.add(e.candidate.toJSON());
    };

    localPC.onaddstream = e => {
      if (e.stream && remoteStream !== e.stream) {
        console.log('RemotePC received the stream join', e.stream);
        setRemoteStream(e.stream);
      }
    };

    const offer = roomSnapshot.data().offer;
    await localPC.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await localPC.createAnswer();
    await localPC.setLocalDescription(answer);

    const roomWithAnswer = { answer };
    await roomRef.update(roomWithAnswer);

    roomRef.collection('callerCandidates').onSnapshot(snapshot => {
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
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  return (
    <>
      <Text style={styles.heading}>Join Screen</Text>
      <Text style={styles.heading}>Room : {roomId}</Text>

      <View style={styles.callButtons}>
        <View style={styles.buttonContainer}>
          <Button title="Click to stop call" onPress={onBackPress} />
        </View>
        <View style={styles.buttonContainer}>
          {!localStream && <Button title="Click to start stream" onPress={startLocalStream} />}
          {localStream && <Button title="Click to join call" onPress={() => joinCall(roomId)} disabled={!!remoteStream} />}
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
          {localStream && <Video style={styles.rtc} source={{ uri: localStream.uri }} resizeMode="cover" />}
        </View>
        <View style={styles.rtcview}>
          {remoteStream && <Video style={styles.rtc} source={{ uri: remoteStream.uri }} resizeMode="cover" />}
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
  }
});
