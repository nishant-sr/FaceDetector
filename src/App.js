import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation'
import FaceRecognition from './components/facerecognition/FaceRecognition'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'
import SignIn from './components/signin/SignIn'
import Register from './components/register/Register'
import Rank from './components/rank/Rank'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import './App.css';


const app = new Clarifai.App({
  apiKey: '6cbbd6c0240a4fc9add7a40b15a77e3a'
})

const particlesOptions = {
  particles: {
    number:{
      value:100,
      density:{
        enable:true,
        value_area : 800
      }
    }
}
}
class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

calculateFaceLocation = (data) =>{
  const face = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol : face.left_col * width,
    topRow : face.top_row * height,
    rightCol : width - (face.right_col * width),
    bottomRow : height - (face.bottom_row * height)
  }
}

faceBox = (box) =>{
  console.log(box);
  this.setState({box : box});
}

onInputChange = (event) =>{
  this.setState({input : event.target.value});
}

onSubmit = () => {
  this.setState({imageUrl : this.state.input});
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input)
    .then(response => this.faceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
}

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setSate({isSignedIn: false})
    } else if(route === 'home'){
      this.setSate({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
  const {isSignedIn,imageUrl, route, box} = this.state;
  return (
    <div className="App">
      <Particles className='particles'
      params={particlesOptions}
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route === 'home'
    ?  <div>
        <Logo/>
        <Rank/>
        <ImageLinkForm
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
        : (
          route ==='signin'
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
        )
      }
    </div>
  );
 }
}

export default App;
