import React, { useState, useMemo, useEffect, useCallback } from 'react';

// --- Configuration ---
const API_URL = "https://e-voting.btsystemportal.app/api/router";

// --- SVG Icons ---
const BackArrowIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const EyeOpenIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>);
const EyeClosedIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064 7 9.542 7 .847 0 1.67.111 2.458.325" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.589 17.589A5.982 5.982 0 0112 15a5.982 5.982 0 01-5.589-2.411m-1.175-1.175A9.953 9.953 0 002.458 12c1.274 4.057 5.064 7 9.542 7a9.953 9.953 0 003.39-1.002m-1.175-1.175l-4.243-4.243m4.243 4.243a3 3 0 00-4.243-4.243m0 0l-4.243-4.243" /></svg>);
const SuccessIcon = () => (<svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const Spinner = () => (<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>);

// --- Voter-facing Components ---

const AuthPage = ({ authMode, setAuthMode, voterId, setVoterId, handleLogin, regName, setRegName, regPhone, setRegPhone, handleRegister, isLoading, setError, setPage }) => (
  <div className="w-full max-w-md mx-auto">
    <img src="https://i.imgur.com/PNCoI4w.png" alt="YPG Logo" className="mx-auto h-24 w-auto mb-6" />
    {authMode === 'login' ? (
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">BED | YPG - E-voting Portal</h1>
        <p className="text-center text-gray-600 mb-8">Please enter your Voter ID to proceed.</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="voterId" className="block text-gray-700 text-sm font-bold mb-2">Voter ID</label>
            <input id="voterId" name="voterId" type="text" value={voterId} onChange={(e) => setVoterId(e.target.value)} className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., V001" disabled={isLoading} />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out disabled:bg-blue-300 disabled:cursor-not-allowed">
            {isLoading ? 'Verifying...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have a Voter ID?{' '}
          <button onClick={() => { setAuthMode('login'); setError(''); }} className="font-medium text-blue-600 hover:underline">Register here</button>
          <span className="mx-2 text-gray-400">|</span>
          <button onClick={() => setPage('adminLogin')} className="font-medium text-blue-600 hover:underline">Admin Login</button>
        </p>
      </div>
    ) : (
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">BED | YPG E-Voting</h1>
        <p className="text-center text-gray-600 mb-8">Register to get your Voter ID and support your nominees.</p>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input id="fullName" name="fullName" type="text" value={regName} onChange={(e) => setRegName(e.target.value)} className="shadow-sm appearance-none border rounded w-full py-3 px-4" placeholder="Enter your full name" disabled={isLoading} />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
            <input id="phone" name="phone" type="tel" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} className="shadow-sm appearance-none border rounded w-full py-3 px-4" placeholder="Enter your phone number" disabled={isLoading} />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-green-300 disabled:cursor-not-allowed">
            {isLoading ? 'Registering...' : 'Get Voter ID'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have a Voter ID?{' '}
          <button onClick={() => { setAuthMode('login'); setError(''); }} className="font-medium text-blue-600 hover:underline">Login here</button>
          <span className="mx-2 text-gray-400">|</span>
          <button onClick={() => setPage('adminLogin')} className="font-medium text-blue-600 hover:underline">Admin Login</button>
        </p>
      </div>
    )}
  </div>
);

const RegistrationSuccessPage = ({ newlyRegisteredId, handleGoToAuth }) => (
  <div className="w-full max-w-md mx-auto text-center">
    <SuccessIcon />
    <h1 className="text-2xl sm:text-3xl font-bold mt-4 mb-2">Registration Successful!</h1>
    <p className="text-gray-600 text-lg mb-4">Please save your new Voter ID. You will need it to log in and vote.</p>
    <div className="bg-gray-100 rounded-lg p-4 mb-8">
      <p className="text-gray-600">Your new Voter ID is:</p>
      <p className="text-3xl font-bold text-gray-800 tracking-widest">{newlyRegisteredId}</p>
    </div>
    <button onClick={handleGoToAuth} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">Proceed to Login</button>
  </div>
);

const VotingPage = ({ voterName, votingData, voteAmounts, setVoteAmounts, handleReview, isLoading }) => {
  const handleAmountChange = (candidateId, value) => {
    const sanitizedValue = value.match(/^[0-9]*\.?[0-9]{0,2}$/);
    if (sanitizedValue || value === '') {
      setVoteAmounts(prev => ({ ...prev, [candidateId]: value }));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
        Welcome, <span className="whitespace-nowrap">{voterName}{`!`}</span> 
      </h1>
      <p className="text-center text-gray-600 mb-8">Enter the amount you wish to vote with for each candidate below.</p>
      
      <div className="space-y-12">
        {votingData.groups && votingData.groups.map((group) => (
          <div key={group.GroupID}>
            <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gray-100 p-3 rounded-lg mb-8">{group.GroupName}</h2>
            {group.categories && group.categories.map(category => (
                <div key={category.CategoryID} className="mb-10">
                    <h3 className="text-xl sm:text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-6">{category.CategoryName}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.candidates && category.candidates.map(candidate => (
                            <div key={candidate.CandidateID} className="rounded-lg border p-4 bg-white shadow-sm flex flex-col">
                              <div className="aspect-w-4 aspect-h-3 mb-4">
                                <img src={candidate.ImageURL || `https://placehold.co/400x300/EBF4FF/333333?text=${candidate.Name.charAt(0)}`} alt={candidate.Name} className="w-full h-full object-cover rounded-md" />
                              </div>
                              <h3 className="text-lg sm:text-xl font-semibold flex-grow">{candidate.Name}</h3>
                              <div className="mt-4">
                                <label htmlFor={`amount-${candidate.CandidateID}`} className="sr-only">Amount for {candidate.Name}</label>
                                <div className="relative">
                                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">GHS&nbsp;</span>
                                  </div>
                                  <input
                                    type="text"
                                    inputMode="decimal"
                                    id={`amount-${candidate.CandidateID}`}
                                    name={`amount-${candidate.CandidateID}`}
                                    className="w-full rounded-md border-gray-300 py-2 pl-12 pr-4 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    placeholder="0.00"
                                    value={voteAmounts[candidate.CandidateID] || ''}
                                    onChange={(e) => handleAmountChange(candidate.CandidateID, e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
          </div>
        ))}
        {votingData.subCategoryBallotSection && votingData.subCategoryBallotSection.subCategories.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gray-100 p-3 rounded-lg mb-8">{votingData.subCategoryBallotSection.title}</h2>
             {votingData.subCategoryBallotSection.subCategories.map(subCategory => (
               <div key={subCategory.SubCategoryID} className="mb-10">
                 <h3 className="text-xl sm:text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-6">{subCategory.SubCategoryName}</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {subCategory.candidates && subCategory.candidates.map(candidate => (
                     <div key={candidate.CandidateID} className="rounded-lg border p-4 bg-white shadow-sm flex flex-col">
                         <div className="aspect-w-4 aspect-h-3 mb-4">
                           <img src={candidate.ImageURL || `https://placehold.co/400x300/EBF4FF/333333?text=${candidate.Name.charAt(0)}`} alt={candidate.Name} className="w-full h-full object-cover rounded-md" />
                         </div>
                         <h3 className="text-lg sm:text-xl font-semibold flex-grow">{candidate.Name}</h3>
                         <div className="mt-4">
                           <label htmlFor={`amount-${candidate.CandidateID}`} className="sr-only">Amount for {candidate.Name}</label>
                           <div className="relative">
                             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                               <span className="text-gray-500 sm:text-sm">GHS&nbsp;</span>
                             </div>
                             <input
                               type="text"
                               inputMode="decimal"
                               id={`amount-${candidate.CandidateID}`}
                               name={`amount-${candidate.CandidateID}`}
                               className="w-full rounded-md border-gray-300 py-2 pl-12 pr-4 text-gray-900 focus:ring-2 focus:ring-blue-500"
                               placeholder="0.00"
                               value={voteAmounts[candidate.CandidateID] || ''}
                               onChange={(e) => handleAmountChange(candidate.CandidateID, e.target.value)}
                             />
                           </div>
                         </div>
                     </div>
                   ))}
                 </div>
               </div>
             ))}
          </div>
        )}
      </div>
      
      <div className="mt-10 text-center">
        <button onClick={handleReview} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg disabled:bg-blue-300">
          Review Votes & Pay
        </button>
      </div>
    </div>
  );
};

// --- NEW 2-STEP REVIEW MODAL ---
const ReviewModal = ({ 
  isOpen, 
  onClose, 
  voteSummary, 
  momoNumber, 
  setMomoNumber, 
  momoNetwork, 
  setMomoNetwork, 
  handleInitiatePayment, 
  isLoading,
  // --- New Props ---
  otp,
  setOtp,
  handleRequestPaymentOtp
}) => {
  const [uiStep, setUiStep] = useState('enterNumber'); // 'enterNumber' or 'enterOtp'
  const [isOtpLoading, setIsOtpLoading] = useState(false); // Separate loading state for OTP request

  const totalAmount = useMemo(() => {
    return voteSummary.reduce((sum, vote) => sum + vote.amount, 0);
  }, [voteSummary]);

  // Handler for the "Send Code" button
  const onSendCodeClick = async () => {
    setIsOtpLoading(true);
    const result = await handleRequestPaymentOtp(); // This function is now passed from App
    if (result) {
      setUiStep('enterOtp'); // Move to next step on success
    }
    setIsOtpLoading(false);
  };

  // Handler for "Go Back" or "Close"
  const handleClose = () => {
    setUiStep('enterNumber'); // Reset the modal step
    setOtp(''); // Clear any OTP
    onClose(); // Call the original close function
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Review Your Votes</h2>
        {/* Vote Summary (no change) */}
        <div className="max-h-60 overflow-y-auto space-y-2 mb-4 pr-2">
          {voteSummary.map((vote, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <p className="font-semibold">{vote.candidateName} <span className="text-gray-500">({vote.categoryName})</span></p>
              <p>GHS {vote.amount.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Total Amount (no change) */}
        <div className="border-t pt-4">
          <div className="flex justify-between font-bold text-lg mb-4">
            <p>Total Amount:</p>
            <p>GHS {totalAmount.toFixed(2)}</p>
          </div>

          {/* --- NEW 2-STEP FORM --- */}
          <div className="space-y-4">
            {/* --- STEP 1: Enter Phone Number --- */}
            <div style={{ display: uiStep === 'enterNumber' ? 'block' : 'none' }}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="momoNetwork" className="block text-sm font-bold text-gray-700 mb-1">Select Network</label>
                  <select 
                    id="momoNetwork" 
                    name="momoNetwork" 
                    value={momoNetwork} 
                    onChange={(e) => setMomoNetwork(e.target.value)} 
                    className="w-full rounded-md border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="mtn-gh">MTN Mobile Money</option>
                    <option value="vodafone-gh">Telecel Cash</option>
                    <option value="airteltigo-gh">AirtelTigo Money</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="momoNumber" className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    id="momoNumber" 
                    name="momoNumber" 
                    value={momoNumber} 
                    onChange={(e) => setMomoNumber(e.target.value)} 
                    className="w-full rounded-md border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500" 
                    placeholder="e.g., 0244123456" 
                  />
                </div>
              </div>
            </div>

            {/* --- STEP 2: Enter OTP --- */}
            <div style={{ display: uiStep === 'enterOtp' ? 'block' : 'none' }}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="momoNumberVerified" className="block text-sm font-bold text-gray-700 mb-1">Phone Number (Verified)</label>
                  <input 
                    type="tel" 
                    id="momoNumberVerified"
                    value={momoNumber} 
                    disabled // Disable the number field
                    className="w-full rounded-md border-gray-300 py-2 px-3 bg-gray-100" 
                  />
                </div>
                <div>
                  <label htmlFor="otp" className="block text-sm font-bold text-gray-700 mb-1">Verification Code</label>
                  <input 
                    type="tel" 
                    id="otp" 
                    name="otp" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    className="w-full rounded-md border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter 6-digit code from SMS"
                    maxLength={6}
                  />
                </div>
              </div>
            </div>

            {/* --- Buttons --- */}
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button 
                onClick={handleClose} 
                disabled={isLoading || isOtpLoading} 
                className="w-full sm:w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg"
              >
                {/* Change "Go Back" to "Close" if on OTP step */}
                {uiStep === 'enterNumber' ? 'Go Back & Edit' : 'Close'}
              </button>

              {/* Show "Send Code" button on step 1 */}
              {uiStep === 'enterNumber' && (
                <button 
                  onClick={onSendCodeClick} 
                  disabled={isOtpLoading || isLoading} 
                  className="w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-blue-300"
                >
                  {isOtpLoading ? 'Sending...' : 'Send Code'}
                </button>
              )}

              {/* Show "Confirm & Pay" button on step 2 */}
              {uiStep === 'enterOtp' && (
                <button 
                  onClick={handleInitiatePayment} 
                  disabled={isLoading || isOtpLoading} 
                  className="w-full sm:w-1/2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-green-300"
                >
                  {isLoading ? 'Processing...' : 'Confirm & Pay'}
                </button>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};


const ThankYouPage = ({ resetToHome, voterName }) => (
    <div className="text-center p-8">
        <svg className="mx-auto h-24 w-24 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h2 className="text-4xl font-bold text-green-600 mt-4">Thank You, {voterName}!</h2>
        <p className="text-xl text-gray-700 mt-2">Your vote has been successfully cast and recorded.</p>
        <p className="text-gray-500 mt-4">Your participation makes a difference.</p>
        <button onClick={resetToHome} className="mt-8 py-3 px-8 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition">
            Go back to Login
        </button>
    </div>
);

const PaymentStatusPage = ({ paymentReference, handleGoToAuth, voterName, setPage, voterId, callApi }) => {
    const [status, setStatus] = useState('pending'); // 'pending', 'success', 'failed'
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes for user to enter PIN

    // --- Effect for Timer ONLY ---
    useEffect(() => {
        if (status !== 'pending' || timeLeft <= 0) {
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerId);
                    setStatus(currentStatus => {
                        if (currentStatus === 'pending') {
                            return 'failed';
                        }
                        return currentStatus;
                    });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [status, timeLeft]);


    // --- Effect for Poller ONLY ---
    useEffect(() => {
        if (status !== 'pending') {
            return;
        }
        
        const checkStatus = async () => {
            console.log("Polling for payment status..."); 
            const result = await callApi('checkPaymentStatus', { paymentReference: paymentReference, voterId: voterId });

            if (result && result.status === 'success' && result.paymentStatus === 'SUCCESS') {
                setStatus('success');
                setPage('thankYou'); 
            } else if (result && (result.paymentStatus === 'FAILED' || result.paymentStatus === 'FAILED_PROCESSING')) {
                setStatus('failed'); 
            }
        };
        
        checkStatus(); // Run once immediately
        
        const pollingId = setInterval(checkStatus, 5000); // Poll every 5 seconds

        return () => {
            clearInterval(pollingId);
        };
    
    }, [status, paymentReference, voterId, setPage, callApi]);


    const seconds = timeLeft % 60;
    const minutes = Math.floor(timeLeft / 60);

    const icon = status === 'pending' ? <svg className="mx-auto h-16 w-16 text-yellow-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> :
                 status === 'success' ? <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> :
                 <svg className="mx-auto h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;

    return (
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            {icon}
            <h3 className="mt-4 text-2xl font-semibold text-gray-900">
                {status === 'pending' ? 'Action Required: Confirm Payment' : status === 'success' ? 'Payment Confirmed!' : 'Payment Failed'}
            </h3>
            <p className="mt-2 text-gray-500">
                {status === 'pending' ? 
                    `A payment request has been sent to your MoMo number. Please confirm the transaction within ${minutes}:${seconds < 10 ? '0' : ''}${seconds} on your phone.` : 
                    status === 'success' ? `Thank you, ${voterName}! Your votes have been successfully recorded.` : 
                    'The transaction failed or timed out. Please check your phone and try voting again.'
                }
            </p>
            {status === 'pending' && (
                <p className="mt-4 text-sm text-indigo-600 font-medium">Reference: {paymentReference}</p>
            )}
            <button 
                onClick={handleGoToAuth} 
                className="mt-6 py-2 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
                {status === 'pending' ? 'Return to Login (Cancel Polling)' : 'Start Over'}
            </button>
        </div>
    );
};

const VotesLogPage = ({ votes, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVotes = votes.filter(vote => {
    const term = searchTerm.toLowerCase();
    
    return (
      vote.voterName.toLowerCase().includes(term) ||
      vote.candidateName.toLowerCase().includes(term) ||
      vote.categoryName.toLowerCase().includes(term) ||
      vote.voterId.toLowerCase().includes(term) ||
      vote.date.toLowerCase().includes(term)
    );
  });

  if (isLoading) {
    return <div className="text-center"><Spinner /><p className="mt-2">Loading votes...</p></div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Successful Votes Log</h2>
      
      <div className="mb-4">
        <input 
          type="text"
          placeholder="Search by Voter, Candidate, Category, or Voter ID..."
          className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {votes.length === 0 ? (
        <p className="text-center text-gray-500">No successful votes have been recorded yet.</p>
      
      ) : filteredVotes.length === 0 ? (
        <p className="text-center text-gray-500">No votes match your search term.</p>

      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900">Date</th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900">Time</th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900">Voter Name</th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900">Candidate</th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900">Category</th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredVotes.map((vote, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{vote.date}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{vote.time}</td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{vote.voterName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{vote.candidateName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{vote.categoryName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">GHS {vote.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const AdminLoginPage = ({ handleAdminLogin, isLoading, resetToHome }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); handleAdminLogin(adminId, password); };
  return (
    <div className="w-full max-w-md mx-auto relative">
      <button onClick={resetToHome} className="absolute top-0 left-0 text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100">
        <BackArrowIcon />
      </button>
      <img src="https://i.imgur.com/PNCoI4w.png" alt="YPG Logo" className="mx-auto h-24 w-auto mb-6" />
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="adminId" className="block text-sm font-bold mb-2">Admin ID</label>
          <input id="adminId" name="adminId" type="text" value={adminId} onChange={(e) => setAdminId(e.target.value)} className="shadow-sm appearance-none border rounded w-full py-3 px-4" disabled={isLoading} />
        </div>
        <div className="relative">
          <label htmlFor="adminPassword" className="block text-sm font-bold mb-2">Password</label>
          <input id="adminPassword" name="adminPassword" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="shadow-sm appearance-none border rounded w-full py-3 px-4 pr-10" disabled={isLoading} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-600">
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-indigo-300 disabled:cursor-not-allowed">{isLoading ? 'Signing In...' : 'Sign In'}</button>
      </form>
    </div>
  );
};

const AdminPanel = ({ 
  dashboardData, adminName, handleLogout, 
  handleAddGroup, handleDeleteGroup, 
  handleAddCategory, handleDeleteCategory, 
  handleAddSubCategory, handleDeleteSubCategory, 
  handleAddCandidate, handleDeleteCandidate, 
  adminToken, callApi, 
  successfulVotes, setSuccessfulVotes,
  refreshAdminDashboardData // <-- NEW PROP
}) => {
  const [view, setView] = useState('results');
  const [newGroupName, setNewGroupName] = useState('');
  const [newCategory, setNewCategory] = useState({ name: '', groupId: ''});
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [newCandidate, setNewCandidate] = useState({ name: '', categoryId: '', imageUrl: '' });
  const [isLoadingVotes, setIsLoadingVotes] = useState(false);

  // --- MODIFIED: Use the prop for refreshing dashboard ---
  const refreshDashboardDataCallback = useCallback(() => {
    console.log('[AdminPanel] Re-fetching dashboard data...');
    refreshAdminDashboardData(adminToken); // <-- Call the prop function
  }, [refreshAdminDashboardData, adminToken]);

  const fetchSuccessfulVotes = useCallback(async () => {
    setIsLoadingVotes(true);
    const result = await callApi('getSuccessfulVotes', { token: adminToken });
    if (result && result.data) {
      setSuccessfulVotes(result.data);
    }
    setIsLoadingVotes(false);
  }, [callApi, adminToken, setSuccessfulVotes]);

  useEffect(() => {
    const wsUrl = 'wss://e-voting.btsystemportal.app';
    console.log(`[AdminPanel] Connecting WebSocket to: ${wsUrl}`);
    
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => console.log('[AdminPanel] WebSocket Connected');
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('[AdminPanel] WebSocket Message Received:', message);
        if (message.type === 'VOTE_UPDATE') {
          console.log('[AdminPanel] Vote update received! Waiting 4 seconds before refreshing...');
          setTimeout(() => {
              console.log('[AdminPanel] Delay finished. Refreshing data now...');
              refreshDashboardDataCallback(); // <-- Use the correct callback
              if (view === 'votes') {
                fetchSuccessfulVotes();
              }
          }, 4000); 
        }
      } catch (error) {
        console.error('[AdminPanel] Failed to parse WebSocket message:', event.data);
      }
    };
    ws.onerror = (e) => console.error('[AdminPanel] WebSocket Error Event:', e);
    ws.onclose = (e) => console.log(`[AdminPanel] WebSocket Close Code: ${e.code}, Reason: ${e.reason}, Was Clean: ${e.wasClean}`);

    return () => {
      console.log('[AdminPanel] Cleanup function running: Attempting to close WebSocket.');
      if (ws && ws.readyState === WebSocket.OPEN) {
          ws.close();
          console.log('[AdminPanel] WebSocket closed via cleanup.');
      } else {
          console.log('[AdminPanel] WebSocket already closed or not open during cleanup.');
      }
    };
  }, [refreshDashboardDataCallback, fetchSuccessfulVotes, view]); // <-- Use the new callback

  const onAddGroup = (e) => { e.preventDefault(); if (!newGroupName) return; handleAddGroup(newGroupName); setNewGroupName(''); };
  const onAddCategory = (e) => { e.preventDefault(); if (!newCategory.name || !newCategory.groupId) return; handleAddCategory(newCategory); setNewCategory({ name: '', groupId: ''}); };
  const onAddSubCategory = (e) => { e.preventDefault(); if (!newSubCategoryName) return; handleAddSubCategory(newSubCategoryName); setNewSubCategoryName(''); };
  const onAddCandidate = (e) => { e.preventDefault(); if (!newCandidate.name || !newCandidate.categoryId) return; handleAddCandidate(newCandidate); setNewCandidate({ name: '', categoryId: '', imageUrl: '' }); };
  
  const getGroupName = (groupId) => dashboardData.groups.find(g => g.GroupID === groupId)?.GroupName || 'Unknown';
  const getCategoryName = (categoryId) => dashboardData.allCategoriesForCandidates.find(c => c.CategoryID === categoryId)?.CategoryName || 'Unknown';

  const handleTabClick = (tabName) => {
    setView(tabName);
    if (tabName === 'votes' && successfulVotes.length === 0) {
      fetchSuccessfulVotes();
    }
  };

  if (!dashboardData || !dashboardData.stats) {
    return <div className="text-center"><Spinner /> <p className="mt-2">Loading dashboard data...</p></div>;
  }

  return (
     <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div><h1 className="text-2xl sm:text-3xl font-bold">Admin Panel</h1><p className="text-gray-600">Welcome, {adminName}!</p></div>
        <button onClick={handleLogout} className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Logout</button>
      </div>
      
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-4 sm:space-x-6 overflow-x-auto">
            <button onClick={() => handleTabClick('results')} className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${view === 'results' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Results</button>
            <button onClick={() => handleTabClick('groups')} className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${view === 'groups' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Groups</button>
            <button onClick={() => handleTabClick('categories')} className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${view === 'categories' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Categories</button>
            <button onClick={() => handleTabClick('subCategories')} className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${view === 'subCategories' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Sub-Categories</button>
            <button onClick={() => handleTabClick('candidates')} className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${view === 'candidates' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Candidates</button>
            <button onClick={() => handleTabClick('votes')} className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${view === 'votes' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Votes</button>
          </nav>
        </div>
        
      {view === 'results' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-100 p-4 rounded-lg text-center"><h3 className="text-lg font-semibold text-gray-600">Total Votes</h3><p className="text-4xl font-bold">{dashboardData.stats.totalVotes}</p></div>
            <div className="bg-gray-100 p-4 rounded-lg text-center"><h3 className="text-lg font-semibold text-gray-600">Unique Voters</h3><p className="text-4xl font-bold">{dashboardData.stats.totalUniqueVoters}</p></div>
            <div className="bg-gray-100 p-4 rounded-lg text-center"><h3 className="text-lg font-semibold text-gray-600">Avg. Votes/Voter</h3><p className="text-4xl font-bold">{dashboardData.stats.averageEngagement.toFixed(1)}</p></div>
            <div className="bg-gray-100 p-4 rounded-lg text-center"><h3 className="text-lg font-semibold text-gray-600">Total Amount</h3><p className="text-4xl font-bold">GHS {dashboardData.stats.totalAmount.toFixed(2)}</p></div>
          </div>
          
          <div className="space-y-8">
            {dashboardData.groups.map(group => (
              <div key={group.GroupID}>
                <h2 className="text-xl sm:text-2xl font-bold mb-4">{group.GroupName}</h2>
                {dashboardData.categories.filter(c => c.GroupID === group.GroupID).map(category => {
                  const categoryResults = dashboardData.results.filter(r => r.categoryId === category.CategoryID);
                  const maxVotes = Math.max(...categoryResults.map(r => r.totalAmount), 0) || 1; 
                  return (
                    <div key={category.CategoryID} className="mb-6">
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">{category.CategoryName}</h3>
                      <div className="space-y-4">{categoryResults.length > 0 ? categoryResults
                        .sort((a, b) => b.totalAmount - a.totalAmount)
                        .map(c => (<div key={c.id} className="bg-white p-4 rounded-lg border"><div className="flex justify-between items-center mb-2"><p className="font-bold text-lg">{c.name}</p><p className="font-bold text-lg">GHS {c.totalAmount.toFixed(2)}</p></div><div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-blue-600 h-4 rounded-full" style={{ width: `${(c.totalAmount / maxVotes) * 100}%` }}></div></div></div>)) : <p className="text-gray-500">No votes cast in this category yet.</p>}</div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      )}
     {view === 'groups' && (
       <div>
         <h2 className="text-2xl font-bold mb-4">Add New Group</h2>
         <form onSubmit={onAddGroup} className="bg-gray-50 p-4 rounded-lg border mb-8 flex flex-col sm:flex-row items-center gap-4">
           <input value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} placeholder="New Group Name" className="p-2 border rounded w-full" required />
           <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">Add Group</button>
         </form>
         <h2 className="text-2xl font-bold mb-4">Current Groups</h2>
         <div className="space-y-2">{dashboardData.groups.map(g => (<div key={g.GroupID} className="flex justify-between items-center p-3 bg-white border rounded-lg"><p>{g.GroupName} ({g.GroupID})</p><button onClick={() => handleDeleteGroup(g.GroupID)} className="text-red-500 hover:text-red-700 font-medium">Delete</button></div>))}</div>
       </div>
      )}
     {view === 'categories' && (
       <div>
         <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
         <form onSubmit={onAddCategory} className="bg-gray-50 p-4 rounded-lg border mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
             <input value={newCategory.name} onChange={(e) => setNewCategory(p => ({...p, name: e.target.value}))} placeholder="Category Name" className="p-2 border rounded" required />
             <select value={newCategory.groupId} onChange={(e) => setNewCategory(p => ({...p, groupId: e.target.value}))} className="p-2 border rounded bg-white" required>
              <option value="">Select a Group</option>
              {dashboardData.groups.map(g => <option key={g.GroupID} value={g.GroupID}>{g.GroupName}</option>)}
             </select>
             <button type="submit" className="bg-blue-600 text-white p-2 rounded h-10 col-span-full">Add Category</button>
         </form>
         <h2 className="text-2xl font-bold mb-4">Current Categories</h2>
         <div className="space-y-2">{dashboardData.categories.map(c => (<div key={c.CategoryID} className="flex justify-between items-center p-3 bg-white border rounded-lg"><p>{c.CategoryName} <span className="text-gray-500">({getGroupName(c.GroupID)})</span></p><button onClick={() => handleDeleteCategory(c.CategoryID)} className="text-red-500">Delete</button></div>))}</div>
       </div>
      )}
     {view === 'subCategories' && (
       <div>
         <h2 className="text-2xl font-bold mb-4">Manage Local Guilder Awards (Sub-Categories)</h2>
         <form onSubmit={onAddSubCategory} className="bg-gray-50 p-4 rounded-lg border mb-8 flex flex-col sm:flex-row items-center gap-4">
           <input value={newSubCategoryName} onChange={(e) => setNewSubCategoryName(e.target.value)} placeholder="New Local Guilder Award Name (e.g., RIIS Congregation)" className="p-2 border rounded w-full" required />
           <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white p-2 rounded px-6">Add Award</button>
         </form>
         <h2 className="text-2xl font-bold mb-4">Current Local Guilder Awards</h2>
         <div className="space-y-2">{dashboardData.subCategories.map(sc => (<div key={sc.SubCategoryID} className="flex justify-between items-center p-3 bg-white border rounded-lg"><p>{sc.SubCategoryName} ({sc.SubCategoryID})</p><button onClick={() => handleDeleteSubCategory(sc.SubCategoryID)} className="text-red-500">Delete</button></div>))}</div>
       </div>
      )}
     {view === 'candidates' && (
       <div>
         <h2 className="text-2xl font-bold mb-4">Add New Candidate</h2>
         <form onSubmit={onAddCandidate} className="bg-gray-50 p-4 rounded-lg border mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
           <input name="name" value={newCandidate.name} onChange={(e) => setNewCandidate(p => ({...p, name: e.target.value}))} placeholder="Candidate Name" className="p-2 border rounded" required />
           <select name="categoryId" value={newCandidate.categoryId} onChange={(e) => setNewCandidate(p => ({...p, categoryId: e.target.value}))} className="p-2 border rounded bg-white" required>
             <option value="">Select a Category/Award</option>
             {dashboardData.allCategoriesForCandidates.map(c => <option key={c.CategoryID} value={c.CategoryID}>{c.CategoryName}</option>)}
           </select>
           <input name="imageUrl" value={newCandidate.imageUrl} onChange={(e) => setNewCandidate(p => ({...p, imageUrl: e.target.value}))} placeholder="Image URL (Optional)" className="p-2 border rounded" />
           <button type="submit" className="bg-blue-600 text-white p-2 rounded h-10">Add Candidate</button>
         </form>
         <h2 className="text-2xl font-bold mb-4">Current Candidates</h2>
         <div className="space-y-2">{dashboardData.candidates.map(c => (<div key={c.CandidateID} className="flex justify-between items-center p-3 bg-white border rounded-lg"><p>{c.Name} <span className="text-gray-500">({getCategoryName(c.CategoryID)})</span></p><button onClick={() => handleDeleteCandidate(c.CandidateID)} className="text-red-500 hover:text-red-700 font-medium">Delete</button></div>))}</div>
       </div>
      )}
     {view === 'votes' && (
       <VotesLogPage votes={successfulVotes} isLoading={isLoadingVotes} />
     )}
     
    </div>
  )
};

// --- Main App Component ---
export default function App() {
  const [page, setPage] = useState('auth');
  const [authMode, setAuthMode] = useState('register'); // Default to register
  const [voterId, setVoterId] = useState('');
  const [voterName, setVoterName] = useState('');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [newlyRegisteredId, setNewlyRegisteredId] = useState('');
  const [votingData, setVotingData] = useState({ groups: [], subCategoryBallotSection: { title: '', subCategories: [] } });
  const [voteAmounts, setVoteAmounts] = useState({});
  const [momoNumber, setMomoNumber] = useState('');
  const [momoNetwork, setMomoNetwork] = useState('mtn-gh');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [adminToken, setAdminToken] = useState(null);
  const [adminName, setAdminName] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [candidateCategoryMap, setCandidateCategoryMap] = useState({});
  const [paymentReference, setPaymentReference] = useState('');
  const [otp, setOtp] = useState(''); // <-- NEW STATE FOR OTP
  const [successfulVotes, setSuccessfulVotes] = useState([]);

  const callApi = useCallback(async (action, data = {}) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action, ...data }),
        redirect: 'follow',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (!response.ok) {
          setError(result.message || 'An unknown server error occurred.');
          return null;
      }

      if (result.status === 'error') {
        setError(result.message);
        return null;
      }

      return result; // Success!

    } catch (err) {
      console.error("API Call Failed (Network Error):", err);
      setError('Could not connect to the voting server. Please check your network and try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = async (e) => { 
      e.preventDefault(); 
      if (!voterId.trim()) {
          setError("Please enter the correct Voter ID.");
          return;
      }
      const result = await callApi('login', { voterId }); 
      if (result) { 
          setVoterId(voterId); 
          setVoterName(result.name); 
          fetchVotingData(); 
      }
  };
  const handleRegister = async (e) => { 
    e.preventDefault();
    if (!regPhone.trim()) {
        setError("Please enter your phone number to register.");
        return;
    } 
    // THIS IS THE OLD REGISTER ACTION. IF YOU IMPLEMENT OTP FOR REGISTER,
    // YOU'LL NEED TO CHANGE THIS.
    const result = await callApi('registerVoter', { fullName: regName, phone: regPhone }); 
    if (result) { setNewlyRegisteredId(result.voterId); setPage('registrationSuccess'); }
  };
  const fetchVotingData = async () => { 
      const result = await callApi('getVotingData'); 
      if(result && result.data) { 
          setVotingData(result.data); 
          
          const newMap = {};
          result.data.groups.forEach(g => {
              g.categories.forEach(c => {
                  if(c.candidates) {
                    c.candidates.forEach(cand => {
                        newMap[cand.CandidateID] = c.CategoryID;
                    });
                  }
              });
          });
          result.data.subCategoryBallotSection.subCategories.forEach(sc => {
              if(sc.candidates) {
                sc.candidates.forEach(cand => {
                    newMap[cand.CandidateID] = sc.SubCategoryID;
                });
              }
          });
          setCandidateCategoryMap(newMap);
          setPage('voting'); 
      }
  };
  
  const handleReview = () => {
      const votesToSubmit = Object.entries(voteAmounts).filter(([_, amount]) => parseFloat(amount) >= 1.00);
      if (votesToSubmit.length === 0) {
          setError("Please enter an amount of at least GHS 1.00 for one candidate.");
          return;
      }
      setIsReviewModalOpen(true);
  };

  // --- NEW FUNCTION: handleRequestPaymentOtp ---
  const handleRequestPaymentOtp = async () => {
    if (!momoNetwork) {
      setError("Please select a mobile money network.");
      return null; // Return null on failure
    }
    if (!momoNumber || !/^\d{10}$/.test(momoNumber)) {
      setError("Please provide your full 10-digit contact number.");
      return null; // Return null on failure
    }
    
    // Use callApi but handle loading manually
    setIsLoading(true); 
    setError('');
    const result = await callApi('requestPaymentOtp', { momoNumber });
    setIsLoading(false); // We set loading false here, callApi will also set it
    
    if (result) {
      // Success!
      return result; // Return the success result
    } else {
      // callApi already set the error message
      return null; // Return null on failure
    }
  };

  // --- MODIFIED FUNCTION: handleInitiatePayment ---
  const handleInitiatePayment = async () => {
    if (!momoNumber || !otp) {
      setError("Phone number and OTP are required.");
      return;
    }

    const votes = Object.entries(voteAmounts)
      .filter(([_, amount]) => parseFloat(amount) >= 1.00)
      .map(([candidateId, amount]) => ({
          candidateId, 
          amount: parseFloat(amount), 
          categoryId: candidateCategoryMap[candidateId] || ''
      }));

    const totalAmount = votes.reduce((sum, vote) => sum + vote.amount, 0);
    if (totalAmount <= 0) {
      setError("Total amount must be greater than zero.");
      return;
    }
        
    const result = await callApi('initiatePayment', { 
        voterId, 
        voterName,
        votes, 
        momoNumber, 
        channel: momoNetwork,
        otp: otp // <-- THE NEW, CRITICAL FIELD
    });
    
    if (result && result.clientReference) {
      setPaymentReference(result.clientReference);
      setIsReviewModalOpen(false);
      setPage('paymentStatus');
      setOtp(''); // Clear the OTP on success
    }
  };

  // --- MODIFIED: Admin Functions for correct prop drilling ---
  const refreshAdminDashboardData = useCallback(async (token) => {
    console.log("[App] Refreshing Admin Dashboard Data...");
    const result = await callApi('getAdminDashboardData', { token });
    if (result && result.data) {
      setDashboardData(result.data);
    }
  }, [callApi]);

  const handleAdminLogin = async (adminId, password) => { 
    const result = await callApi('adminLogin', { adminId, password }); 
    if (result) { 
      setAdminToken(result.token); 
      setAdminName(result.name); 
      refreshAdminDashboardData(result.token); // Call the refresh function
      setPage('adminPanel'); // Set page *after* starting data load
    }
  };
  
  const handleAddGroup = async (groupName) => { const result = await callApi('addGroup', { groupName, token: adminToken }); if (result) refreshAdminDashboardData(adminToken); };
  const handleDeleteGroup = async (groupId) => { if(window.confirm('Delete this group? This will also delete related categories and candidates.')) { const result = await callApi('deleteGroup', { groupId, token: adminToken }); if (result) refreshAdminDashboardData(adminToken); }};
  const handleAddCategory = async (categoryData) => { const result = await callApi('addCategory', { categoryName: categoryData.name, groupId: categoryData.groupId, token: adminToken }); if (result) refreshAdminDashboardData(adminToken); };
  const handleDeleteCategory = async (categoryId) => { if(window.confirm('Delete this category? This will also delete all candidates within it.')) { const result = await callApi('deleteCategory', { categoryId, token: adminToken }); if (result) refreshAdminDashboardData(adminToken); }};
  const handleAddSubCategory = async (subCategoryName) => { const result = await callApi('addSubCategory', { subCategoryName, token: adminToken }); if (result) refreshAdminDashboardData(adminToken); };
  const handleDeleteSubCategory = async (subCategoryId) => { if(window.confirm('Delete this award?')) { const result = await callApi('deleteSubCategory', { subCategoryId, token: adminToken }); if (result) refreshAdminDashboardData(adminToken); }};
  const handleAddCandidate = async (candidateData) => { const result = await callApi('addCandidate', { ...candidateData, token: adminToken }); if (result) refreshAdminDashboardData(adminToken); };
  const handleDeleteCandidate = async (candidateId) => { if (window.confirm('Delete this candidate?')) { const result = await callApi('deleteCandidate', { candidateId, token: adminToken }); if (result) refreshAdminDashboardData(adminToken); }};
  // We no longer need handleDeleteVoter as the tab is gone
  const handleLogout = () => { setAdminToken(null); setAdminName(''); setDashboardData(null); setPage('auth'); };
  
  const resetToHome = () => {
    setVoterId('');
    setVoterName('');
    setVoteAmounts({});
    setRegName('');
    setRegPhone('');
    setError('');
    setAuthMode('register'); // Back to register
    setPage('auth');
    setPaymentReference(''); 
    setOtp(''); // Clear OTP on reset
  };
  
  const renderPage = () => {
    switch(page) {
      case 'auth': return <AuthPage {...{ authMode, setAuthMode, voterId, setVoterId, handleLogin, regName, setRegName, regPhone, setRegPhone, handleRegister, isLoading, setError, setPage }} />;
      case 'registrationSuccess': return <RegistrationSuccessPage {...{ newlyRegisteredId, handleGoToAuth: resetToHome }} />;
      case 'voting': return <VotingPage {...{ voterName, votingData, voteAmounts, setVoteAmounts, handleReview, isLoading }} />;
      case 'adminLogin': return <AdminLoginPage {...{ handleAdminLogin, isLoading, resetToHome }} />;
      case 'adminPanel': 
        return dashboardData ? 
          <AdminPanel 
            {...{ 
              dashboardData, 
              adminName, 
              handleLogout, 
              handleAddGroup, 
              handleDeleteGroup, 
              handleAddCategory, 
              handleDeleteCategory, 
              handleAddSubCategory, 
              handleDeleteSubCategory, 
              handleAddCandidate, 
              handleDeleteCandidate, 
              adminToken, 
              callApi,
              successfulVotes,
              setSuccessfulVotes,
              refreshAdminDashboardData // Pass the correct refresh function
            }} 
          /> 
          : <div className="text-center"><Spinner /><p className="mt-2 text-gray-600">Loading dashboard data...</p></div>;
      
      case 'paymentStatus': 
        return <PaymentStatusPage 
          paymentReference={paymentReference}
          handleGoToAuth={resetToHome} 
          voterName={voterName}
          setPage={setPage}
          voterId={voterId}
          callApi={callApi}
        />;
      case 'thankYou':
        return <ThankYouPage 
          resetToHome={resetToHome} 
          voterName={voterName} 
        />;
      default: return <AuthPage />;
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-6xl">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">{error}</div>}
        {renderPage()}
      </div>
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} BED E-Voting System. All rights reserved.</p>
      </footer>

      {/* --- MODIFIED: ReviewModal call with new props --- */}
      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setOtp(''); // Clear OTP on close
        }}
        voteSummary={
          Object.entries(voteAmounts)
                .filter(([_, amount]) => parseFloat(amount) >= 1.00)
                .map(([candidateId, amount]) => {
                    let candidateName = '';
                    let categoryName = '';
                    let allCandidates = [];
                    if(votingData.groups) {
                        votingData.groups.forEach(g => {
                            if(g.categories) g.categories.forEach(c => {
                              if(c.candidates) allCandidates = allCandidates.concat(c.candidates.map(cand => ({...cand, categoryName: c.CategoryName})))
                            });
                        });
                    }
                    if(votingData.subCategoryBallotSection && votingData.subCategoryBallotSection.subCategories) {
                        votingData.subCategoryBallotSection.subCategories.forEach(sc => {
                          if(sc.candidates) allCandidates = allCandidates.concat(sc.candidates.map(cand => ({...cand, categoryName: sc.SubCategoryName})))
                        });
                    }
                    const candidateInfo = allCandidates.find(c => c.CandidateID === candidateId);
                    if(candidateInfo){
                        candidateName = candidateInfo.Name;
                        categoryName = candidateInfo.categoryName;
                    }
                    return { candidateName, categoryName, amount: parseFloat(amount) };
                })
        }
        momoNumber={momoNumber}
        setMomoNumber={setMomoNumber}
        momoNetwork={momoNetwork}
        setMomoNetwork={setMomoNetwork}
        handleInitiatePayment={handleInitiatePayment}
        isLoading={isLoading}
        // --- ADD THESE 3 NEW PROPS ---
        otp={otp}
        setOtp={setOtp}
        handleRequestPaymentOtp={handleRequestPaymentOtp}
        // -----------------------------
      />
    </div>
  );
}