import { React, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as tf from '@tensorflow/tfjs'
import * as tflite from '@tensorflow/tfjs-tflite'
import Home from './Home'
import Profile from './Profile'

tflite.setWasmPath('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@0.0.1-alpha.8/dist/')
const Dashboard = ({ userId, imgUrl }) => {
  const [user, setUser] = useState({})
  const [menuClicked, setMenuClicked] = useState(false)
  const [homeClicked, setHomeClicked] = useState(true)
  const [youClicked, setYouClicked] = useState(false)
  const [view, setView] = useState('')
  const history = useHistory()
  const [isNewSession, setIsNewSession] = useState(false)
  const classes = {
  	0: "Bowen's disease",
	1: "basal cell carcinoma",
	2: "benign keratosis-like lesions",	
	3: "dermatofibroma",
	4: "melanocytic nevi",
	5: "melanoma",
	6: "vascular lesions"
  };
  var model; // This is in a global scope
  const loadModel = async () => {
  	try {
      console.log('fetching model..')
      const tfliteModel = await tflite.loadTFLiteModel('./skin_cancer_detection_model_mobilenet .tflite')
      console.log('model fetched')
      model = await tfliteModel; // assigning it to the global scope model as tfliteModel can only be used within this scope
      console.log(model);
      //  Checking if model loaded
      if (tfliteModel) {
        console.log('model loaded')
      }  
    } catch (error) {
      console.log('could not fetch error because '+error)
    }
  };
  useEffect(()=>{
  	

//const status = document.getElementById("status");

//if (status) {
//status.innerText = "Loaded TensorFlow.js - version:" + tf.version.tfjs;
//}

   


    loadModel();

    // Function to classify image
    

    // Image uploading
    // const fileInput = document.getElementById("file-input");
    // const image = document.getElementById("image");

   

    // Add listener to see if someone uploads an image
    // fileInput.addEventListener("change", getImage);

  },[])
  const classifyImage=(model, image)=> {
    // Preprocess image
    image = tf.image.resizeBilinear(image, [256, 256]); // image size needs to be same as model inputs 
    image = tf.expandDims(image);
    console.log(image);
    // console.log(model);

    // console.log(tflite.getDTypeFromTFLiteType("uint8")); // Gives int32 as output thus we cast int32 in below line
    // console.log(tflite.getDTypeFromTFLiteType("uint8"));
    console.log("converting image to different datatype...");
    // image = tf.cast(image, "int32"); // Model requires uint8
    console.log("model about to predict...");
    const output = model.predict(image);
    console.log("model done predicting");
    const output_values = tf.softmax(output.arraySync()[0]);
    console.log("Arg max:")
    // console.log(output);
    console.log(output_values.argMax().arraySync());
    console.log("Output:")
    // console.log(output.arraySync()); 
    console.log(output.arraySync()[0]); // arraySync() Returns an array to use

    // Update HTML
    console.log('Predicted class...')
    console.log(classes[output_values.argMax().arraySync()]);
    const max = output.max().arraySync() * 100
    console.log('Predicted Prob...')
    console.log(max.toFixed(3) + "%");
  }
  
  const analyzeImage = (imgUrl) =>{
    if (imgUrl!==undefined){
      const imageElement = new Image();
      imageElement.src = imgUrl;

      // When image object loaded
      imageElement.onload = function() {
        // Display image
        // image.setAttribute("src", this.src);

        // Log image parameters
        const currImage = tf.browser.fromPixels(imageElement);

        // Classify image
        classifyImage(model, currImage);
      };
    }
  }
  /*
  const getImage = (file) => {
    
    // const file = fileInput.files[0];

    // Get the data url from the image
    // const reader = new FileReader();

    // When reader is ready display image
    reader.onload = (event)=> {
      // Get data URL
      const dataUrl = event.target.result;

      // Create image object
      const imageElement = new Image();
      imageElement.src = dataUrl;

      // When image object loaded
      imageElement.onload = function() {
        // Display image
        // image.setAttribute("src", this.src);

        // Log image parameters
        const currImage = tf.browser.fromPixels(imageElement);

        // Classify image
        classifyImage(model, currImage);
      };

      //document.body.classList.add("image-loaded");
    };

    // Get data url
    reader.readAsDataURL(file);
  }*/
  useEffect(() => {
    if (homeClicked) {
      setYouClicked(false)
      setView(<Home user={user} 
        analyzeImage={
          (imgUrl)=>{
            analyzeImage(imgUrl)
          }
        }
      />)
    }
  }, [homeClicked])
  useEffect(() => {
    if (youClicked) {
      setHomeClicked(false)
      setView(<Profile user={user} />)
    }
  }, [youClicked])
  const fetchUserAPI = async ({ data, req }) => {
    try {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
      console.log(data)
      const resp = await fetch('https://dermaiserver.herokuapp.com/' + req, opts)
      const response = await resp.json()
      const user = response.user
      console.log(user)
      setUser(user)
      setIsNewSession(true)
    } catch (TypeError) {}
  }
  
  useEffect(() => {
    var email = window.sessionStorage.getItem('user-id')
    var sess = 0
    if (userId !== null) {
      userId.split('').forEach((elem) => {
        sess += elem.codePointAt(0)
      })
      const sesn = window.sessionStorage.getItem('sess-recg-id')
      const session = window.sessionStorage.getItem('idt-curr-usr')
      if (sesn !== null && session !== null) {
        if (sesn / session === sess) {
          fetchUserAPI({ data: { _id: userId }, req: 'getUserDetails' })
        } else {
          setIsNewSession(false)
          history.push('/signin')
        }
      } else {
        setIsNewSession(false)
        history.push('/signin')
      }
    } else {
      fetchUserAPI({ data: { email: email }, req: 'getUserDetails' })
    }
  }, [userId])
  
  const handleNavigator = (e) => {
    const name = e.target.getAttribute('name')
    if (name === 'home') {
      setHomeClicked(true)
    }
    if (name === 'you') {
      setYouClicked(true)
    }
  }
  if (isNewSession) {
    return (
      <>
        <div>
          {view}
          <div
            style={{
              position: 'fixed',
              bottom: '.4rem',
              left: '0rem',
              width: '100vw',
            }}
          >
            <div
              style={{
                width: '95%',
                margin: 'auto',
                padding: '1.2rem',
                display: 'flex',
                gap: '4rem',
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                fontSize: '1rem',
                boxShadow: 'black 0px 0px 7px',
                textShadow: 'black 0px 0px 10px',
                borderRadius: '4rem',
                alignItem: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(250, 90, 81)',
              }}
              onClick={(e) => {
                handleNavigator(e)
              }}
            >
              <div>
                <label
                  name='menu'
                  style={{
                    cursor: 'pointer',
                    borderBottom: menuClicked
                      ? 'solid lightgreen 4px'
                      : 'solid lightgreen 0px',
                  }}
                >
                  MENU
                </label>
              </div>
              <div>
                <label
                  name='home'
                  style={{
                    cursor: 'pointer',
                    borderBottom: homeClicked
                      ? 'solid lightgreen 4px'
                      : 'solid lightgreen 0px',
                  }}
                >
                  HOME
                </label>
              </div>
              <div>
                <label
                  name='you'
                  style={{
                    cursor: 'pointer',
                    borderBottom: youClicked
                      ? 'solid lightgreen 4px'
                      : 'solid lightgreen 0px',
                  }}
                >
                  YOU
                </label>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default Dashboard