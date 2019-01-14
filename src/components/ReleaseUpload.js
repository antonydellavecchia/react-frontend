import React from 'react';
//import { Cropper } from 'react-image-cropper';
import { Grid, Row, Col} from 'react-bootstrap';

import { userService } from '../services';

export class ReleaseUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadStatus: false,
      tracks: [],
      imagePreview: null,
      uploadTracks: [],
      coverPreview: null,
      coverData: null,
    }
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.imageUpload = this.imageUpload.bind(this);
    this.cropImage = this.cropImage.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    // add release info to form
    data.append('cover', this.state.coverData);
    
    //    this.state.uploadTracks.forEach((trackInput, trackIndex) => {
    //      console.log(trackInput);
    //      data.append(`tracks[${trackIndex}]`, trackInput.title.value);
    //      data.append(`track_${trackIndex}`, trackInput.file.files[0]);
    //    });

    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }

    userService.authPost(data, '/releases');
  }

  addTrack(e) {
    e.preventDefault();

    let trackIndex = this.state.tracks.length;

    // initate new track upload input
    this.setState({
      uploadTracks: [...this.state.uploadTracks, {}]
    });
    
    let trackInput = (
      <div className="form-group general-text">
        <input className="form-control general-text"
               ref={(ref) => {
                   let uploadTracks = [...this.state.uploadTracks];

                   uploadTracks[trackIndex].title = ref;
                   
                   this.setState({uploadTracks: uploadTracks});
               }}
               name="tracks[]"
               type="text"
               placeholder="Track Title" />
        <input className="form-control general-text"
               ref={ref => {
                   let uploadTracks = [...this.state.uploadTracks];

                   uploadTracks[trackIndex].file = ref;
                   
                   this.setState({uploadTracks: uploadTracks});
               }}
               name={ "track_" + trackIndex}
               type="file" />
        <label for="file"><strong>Choose a file</strong></label>
      </div>
    );

    this.setState({
      tracks: [...this.state.tracks, trackInput]
    });
    
  }

  removeTrack(e) {
    e.preventDefault();

    // create cop
    let tracks = [...this.state.tracks];

    // find element to remove
    let index = parseInt(e.target.parentNode.getAttribute('data-key'));

    // remove
    tracks.splice(index, 1);

    // update
    this.setState({tracks: tracks});
  }

//  imageUpload(value) {
//    let input = value.target;
//    
//    // load image input
//    if (input.files && input.files[0]) {
//      let reader = new FileReader();
//
//      reader.onload = (e) => {
//        console.log(e.target.result);
//        // imagePreview div
//        
//        let imagePreview = (
//          <div className="img-preview">
//            <Cropper
//              src={ e.target.result }
//              ref={ref => { this.cropper = ref }} />
//          </div>
//        );
//
//        // set cropper and remoce previous cover
//        this.setState({imagePreview: imagePreview, cover: null});
//      }
//
//      reader.readAsDataURL(input.files[0]);
//    }
//
//  }
//
//  cropImage(e) {
//    // stop from submitting form
//    e.preventDefault();
//    
//    if (!this.state.imagePreview) {
//      return;
//    }
//
//    let coverData = this.cropper.crop();
//    let coverPreview =  (
//      <div className="stove-display">
//        <div className="stove-background">
//          <img src="assets/images/stove.png"/>
//        </div>
//
//	<div className="cover">
//          <img src={coverData}/>
//        </div>
//      </div>
//    );
//
//    this.setState({coverPreview: coverPreview, coverData: coverData});
//  }
//
//
  
  render() {
    return(
      <div className="release-form">
        <form onSubmit={this.handleSubmit} >
          <Grid fluid>
            <Row className="general-text">
              <label className="control-label">Artist</label>
              <input className="form-control general-text"
                     name="artist"
                     type="text"
                     placeholder="" />
            </Row>
            
            <Row className="general-text">
              
              <label className="control-label">Release Title</label>
              <input className="form-control general-text"
                     name="title"
                     type="text"
                     placeholder="" />
              <label className="control-label">Release Cover</label>
            </Row>

            <Row className="general-text">
	      <input accept="image/png,image/jpeg"
		     type="file"
		     className="form-control"
		     onChange={this.imageUpload}/>

              { !this.state.coverPreview ? this.state.imagePreview : this.state.coverPreview }
              
              <button onClick={this.cropImage} style={{ float: 'right' }}>
                Crop Image
              </button>
            </Row>

            <Row>
              <div>
                {
                  this.state.tracks.map((input, index) => {
                    return (
                      <div data-key={index}>
                        <div className="track-input">
                          <div className="track-number">
                            {index + 1}
                          </div>
                          
                          <div className="inputs">
                            {input}
                          </div>
                          
                          <div className="stove-button">
                            <div onClick={ this.removeTrack} className="stove-display">
                              <div className="stove-background">
                                <img height="40px" src="assets/images/stove.png"/>
                              </div>
                              
                              <div className="stove-button-text">
                                X
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    );
                  })
                }
              </div>

              <div>
                <button className="btn btn-success" onClick={ this.addTrack }>Add Track</button>
              </div>
            </Row>
          </Grid>

          <button> Submit</button>
        </form>

      </div>
    )
  }
}

