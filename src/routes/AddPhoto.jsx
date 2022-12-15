import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPhoto = (e) => {
    e.preventDefault();
    // membuat data baru yang akan dikirim

  if (secret === 'password') {
    fetch("https://gallery-app-server.vercel.app/photos", {
    method: "POST", // HTTP method
    headers: {
    // HTTP headers
      "Content-type": "application/json", // type data yang dikirim
    },
    body: JSON.stringify({
      imageUrl : imageUrl,
      captions : captions,
      createdAt: new Date(),
      updatedAt: new Date(),
      secret : 'password',
    }), // data yang dikirim
  })
  navigate('/photos')
  .then((response) => response.json())
  .then((json) => console.log(json));
  }
  else{
    setError('You are not authorized')
  }
    // TODO: answer here
  };

  return (
    <>
      <div className="container">
      {error && <div className="error-msg">{error}</div>}
        <form className="add-form"  onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className="add-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="add-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="add-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
