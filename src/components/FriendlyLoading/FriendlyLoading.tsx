import "./FriendlyLoading.css";

const LOADING_MESSAGES = [
  'Be patient, your data is coming...',
  'Getting data, just for you. Hang tight...',
  'Please wait...',
  'Loading your data...',
];

export default function FriendlyLoading() {
  let loadingMessage = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

  return (
    <div className="friendly-loading">
      <div className="loading"><div></div><div></div><div></div></div>
      <h5 className="loading-message">{loadingMessage}</h5>
    </div>
  )
};
