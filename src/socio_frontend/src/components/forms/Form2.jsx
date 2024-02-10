import React, { useState, useContext } from 'react';
import ProfileContext from '../ProfileContext';
import socio_connect_logo from '../../../assets/images/socio_connect_logo.png';
import Resizer from 'react-image-file-resizer';
import default_pic from '../../../assets/images/default_profile.jpg';
import CreateUser from '../create_user/CreateUser';

export default function Form2({ setUserExists }) {

    const { contextData, updateContextData } = useContext(ProfileContext);

    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [pic, setPic] = useState(default_pic);
    const [blobPic, setBlobPic] = useState(null);

    const handleImageUpload = (event) => {
        let file = event.target.files[0];
        handleBlobConversion(file);

        Resizer.imageFileResizer(
            file,
            300,
            300,
            'JPEG',
            100,
            0,
            async (uri) => {
                setPic(uri);
            },
            'base64'
        );
    };

    function handleBlobConversion(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            var blob = new Blob([event.target.result], { type: file.type });
            blob = new Uint8Array(blob);
            updateContextData({...contextData, pic: blob});
        };
        reader.readAsArrayBuffer(file);
    };

    const handleGender = (event) => {
        setGender(event.target.value);
        updateContextData({ ...contextData, gender: event.target.value });
    };

    const handleDOB = (event) => {
        setDob(event.target.value);
        updateContextData({ ...contextData, dob: event.target.value });
    }

    return (
        <div id="form2">
            <div id="form-img">
                <img src={socio_connect_logo} alt="form logo" />
            </div>
            <div id="personal-info">

                <div id="profile-pic-section">
                    <label htmlFor="file-input">
                        <img src={pic} alt="profile-pic" id="file-photo" />
                        <p>*Click to update</p>
                    </label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} id="file-input" style={
                        {
                            display: 'none'
                        }
                    } />
                </div>

                <div id="profile-rem-section">
                    <label htmlFor="gender"><p>Select your gender</p></label>
                    <select name="gender" id="gender" value={gender} onChange={handleGender}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="dob"><p>Select you DOB</p></label>
                    <input type="date" id="dob" value={dob} onChange={handleDOB} />

                    {
                        <CreateUser setUserExists={setUserExists} />
                    }
                </div>
            </div>

        </div>
    )
}
