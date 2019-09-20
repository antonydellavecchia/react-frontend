import React from 'react';
import * as THREE from 'three';
import { connect } from 'react-redux';
import { getTrackState } from '../helpers/selectors';
import { audioPlayerActions } from '../actions/audioPlayer.actions';

const mapStateToProps = state => {
  return {
    audioTrack: getTrackState(state),
    isPlaying: state.audioPlayer.isPlaying,
    controllerView: state.audioPlayer.controllerView,
    queue: state.audioPlayer.queue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveTrack: track => dispatch(audioPlayerActions.setActiveTrack(track)),
  };
};

class ThreeScene extends React.Component{
  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 4

    // add listener
    this.listener = new THREE.AudioListener();
    this.audio = new THREE.Audio(this.listener);
    this.audio.crossOrigin = "anonymous";
    
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    const geometry = new THREE.SphereGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 'rgb(57,250,0)'     })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
    this.start()
  }

  componentDidUpdate() {
    // update three audio listener
    this.props.audioTrack.oncanplaythrough = function() {
      console.log(this.props.audioTrack);
      this.audio.setMediaElementSource(this.props.audioTrack);
    }.bind(this)

  }
  
  componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
  
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
  stop = () => {
    cancelAnimationFrame(this.frameId)
  }
  animate = () => {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }
  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }
  render(){
    return(
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

const connectedThreeScene = connect(mapStateToProps, mapDispatchToProps)(ThreeScene)

export { connectedThreeScene as ThreeScene }
