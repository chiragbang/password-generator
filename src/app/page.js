"use client"
import { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import "./Page.css"

function generatePassword(length, includeLower, includeUpper, includeNumbers, includeSymbols) {
  let charset = '';
  if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
  if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeNumbers) charset += "0123456789";
  if (includeSymbols) charset += "!@#$%^&*()_+{}[]|\\:;?><,./-=";
  
  if (charset === '') {
    console.error('Please select at least one character type.');
    return '';
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export default function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(passwordLength, includeLower, includeUpper, includeNumbers, includeSymbols);
    setPassword(newPassword);
    setShowCopiedMessage(false); // Reset copied message visibility
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setShowCopiedMessage(true); // Show copied message
    setTimeout(() => {
      setShowCopiedMessage(false); // Hide copied message after 2 seconds
    }, 2000);
  };

  return (
    <>
      <h1>Random Password Generator</h1>
      <div className='container'>
        <div className="password-generator">
          <div>
            <label style={{fontSize:"25px", fontWeight:"800"}}>Generated Password:</label>
            <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
              <input type="text" value={password} readOnly className="generated-password" />
              <FaCopy onClick={handleCopyPassword} style={{fontSize:"25px", cursor:"pointer"}} />
              {showCopiedMessage && <span className="copied-message">Copied!</span>}
            </div>
          </div>
          <div className="password-controls">
            <label style={{fontSize:"20px", fontWeight:"600"}}>Password Length: {passwordLength}</label>
            <input 
              type="range" 
              min="6" 
              max="20" 
              value={passwordLength} 
              onChange={(e) => setPasswordLength(parseInt(e.target.value))}
              className="password-slider"
            />
          </div>
          <div className="checkboxes">
            <div>
              <input 
                type="checkbox" 
                checked={includeLower} 
                onChange={(e) => setIncludeLower(e.target.checked)} 
              />
              <label>Include Lowercase</label>
            </div>
            <div>
              <input 
                type="checkbox" 
                checked={includeUpper} 
                onChange={(e) => setIncludeUpper(e.target.checked)} 
              />
              <label>Include Uppercase</label>
            </div>
            <div>
              <input 
                type="checkbox" 
                checked={includeNumbers} 
                onChange={(e) => setIncludeNumbers(e.target.checked)} 
              />
              <label>Include Numbers</label>
            </div>
            <div>
              <input 
                type="checkbox" 
                checked={includeSymbols} 
                onChange={(e) => setIncludeSymbols(e.target.checked)} 
              />
              <label>Include Symbols</label>
            </div>
          </div>
          <button onClick={handleGeneratePassword} className="generate-button">Generate Password</button>
        </div>
      </div>
    </>
  );
}
