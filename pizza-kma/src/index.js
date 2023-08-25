import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
function showOrHideAside() {
	if (window.innerWidth <= 530 && window.innerWidth > 300) {
		//hideAsideWithClick();
		//showAside();
	} else {
		document.getElementById("bucketAside").style.transform = "translateX(0)";
	}
}


window.addEventListener("resize", () => {
  
  showOrHideAside();
});

reportWebVitals();
