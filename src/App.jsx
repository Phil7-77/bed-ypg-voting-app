import React, { useState, useMemo, useEffect } from 'react'; // Added useEffect

// --- Configuration ---
const API_URL = "https://e-voting.btsystemportal.app/api/router";

// --- SVG Icons ---
// (Icons remain the same - omitted for brevity)
const BackArrowIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const EyeOpenIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>);
const EyeClosedIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .847 0 1.67.111 2.458.325" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.589 17.589A5.982 5.982 0 0112 15a5.982 5.982 0 01-5.589-2.411m-1.175-1.175A9.953 9.953 0 002.458 12c1.274 4.057 5.064 7 9.542 7a9.953 9.953 0 003.39-1.002m-1.175-1.175l-4.243-4.243m4.243 4.243a3 3 0 00-4.243-4.243m0 0l-4.243-4.243" /></svg>);
const SuccessIcon = () => (<svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const Spinner = () => (<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>);


// --- Voter-facing Components ---
// (AuthPage, RegistrationSuccessPage, VotingPage, ReviewModal remain the same - omitted for brevity)
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
          <button onClick={() => { setAuthMode('register'); setError(''); }} className="font-medium text-blue-600 hover:underline">Register here</button>
          <span className="mx-2 text-gray-400">|</span>
          <button onClick={() => setPage('adminLogin')} className="font-medium text-blue-600 hover:underline">Admin Login</button>
        </p>
      </div>
    ) : (
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">Register for Voter ID</h1>
        <p className="text-center text-gray-600 mb-8">Fill out the form to get your unique Voter ID.</p>
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
    // Allow only numbers and up to two decimal places
    const sanitizedValue = value.match(/^[0-9]*\.?[0-9]{0,2}$/);
    if (sanitizedValue || value === '') {
      setVoteAmounts(prev => ({ ...prev, [candidateId]: value }));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Welcome, {voterName}!</h1>
      <p className="text-center text-gray-600 mb-8">Enter the amount (GHS) you wish to vote with for each candidate below.</p>
      
      <div className="space-y-12">
        {/* Main Groups/Categories */}
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
                                    <img 
                                        src={candidate.ImageURL || `https://placehold.co/400x300/EBF4FF/333333?text=${encodeURIComponent(candidate.Name.charAt(0))}`} 
                                        alt={candidate.Name} 
                                        className="w-full h-full object-cover rounded-md" 
                                        onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/400x300/EBF4FF/333333?text=${encodeURIComponent(candidate.Name.charAt(0))}`; }} // Fallback for broken image URLs
                                    />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold flex-grow">{candidate.Name}</h3>
                                <div className="mt-4">
                                    <label htmlFor={`amount-${candidate.CandidateID}`} className="sr-only">Amount for {candidate.Name}</label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">GHS&nbsp;</span>
                                        </div>
                                        <input
                                            type="text" // Use text to allow decimal input easily
                                            inputMode="decimal" // Hint for mobile keyboards
                                            pattern="[0-9]*\.?[0-9]{0,2}" // Pattern for validation (optional)
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

        {/* SubCategory Section (if exists) */}
        {votingData.subCategoryBallotSection && votingData.subCategoryBallotSection.subCategories && votingData.subCategoryBallotSection.subCategories.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gray-100 p-3 rounded-lg mb-8">{votingData.subCategoryBallotSection.title}</h2>
             {votingData.subCategoryBallotSection.subCategories.map(subCategory => (
               <div key={subCategory.SubCategoryID} className="mb-10">
                 <h3 className="text-xl sm:text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-6">{subCategory.SubCategoryName}</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {subCategory.candidates && subCategory.candidates.map(candidate => (
                       <div key={candidate.CandidateID} className="rounded-lg border p-4 bg-white shadow-sm flex flex-col">
                           <div className="aspect-w-4 aspect-h-3 mb-4">
                               <img 
                                   src={candidate.ImageURL || `https://placehold.co/400x300/EBF4FF/333333?text=${encodeURIComponent(candidate.Name.charAt(0))}`} 
                                   alt={candidate.Name} 
                                   className="w-full h-full object-cover rounded-md" 
                                   onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/400x300/EBF4FF/333333?text=${encodeURIComponent(candidate.Name.charAt(0))}`; }} // Fallback
                               />
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
                                       pattern="[0-9]*\.?[0-9]{0,2}"
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
        <button onClick={handleReview} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg disabled:bg-blue-300 disabled:cursor-not-allowed">
          {isLoading ? 'Processing...' : 'Review Votes & Pay'}
        </button>
      </div>
    </div>
  );
};

const ReviewModal = ({ isOpen, onClose, voteSummary, momoNumber, setMomoNumber, momoNetwork, setMomoNetwork, handleInitiatePayment, isLoading }) => {
  const totalAmount = useMemo(() => {
    return voteSummary.reduce((sum, vote) => sum + vote.amount, 0);
  }, [voteSummary]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 scale-100">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Review Your Votes</h2>
        
        {/* Scrollable Vote Summary */}
        <div className="max-h-60 overflow-y-auto space-y-2 mb-4 pr-2 border rounded p-3 bg-gray-50">
          {voteSummary.length > 0 ? voteSummary.map((vote, index) => (
            <div key={index} className="flex justify-between items-center text-sm border-b pb-1 last:border-b-0">
              <p className="font-semibold text-gray-700">{vote.candidateName} <span className="text-gray-500 font-normal">({vote.categoryName})</span></p>
              <p className="text-gray-800">GHS {vote.amount.toFixed(2)}</p>
            </div>
          )) : (
             <p className="text-gray-500 text-center">No votes selected with GHS 1.00 or more.</p>
          )}
        </div>
        
        {/* Total Amount */}
        <div className="border-t pt-4">
          <div className="flex justify-between font-bold text-lg mb-4">
            <p className="text-gray-800">Total Amount:</p>
            <p className="text-blue-600">GHS {totalAmount.toFixed(2)}</p>
          </div>
          
          {/* Payment Details Form */}
          <div className="space-y-4">
            <div>
              <label htmlFor="momoNetwork" className="block text-sm font-bold text-gray-700 mb-1">Select Network</label>
              <select 
                  id="momoNetwork" 
                  name="momoNetwork" 
                  value={momoNetwork} 
                  onChange={(e) => setMomoNetwork(e.target.value)} 
                  className="w-full rounded-md border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
                  disabled={isLoading}
              >
                  <option value="mtn-gh">MTN Mobile Money</option>
                  <option value="vodafone-gh">Telecel Cash</option> {/* Updated name */}
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
                  onChange={(e) => setMomoNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} // Allow only 10 digits
                  className="w-full rounded-md border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 shadow-sm" 
                  placeholder="e.g., 0244123456" 
                  maxLength={10}
                  disabled={isLoading}
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              <button 
                  onClick={onClose} 
                  disabled={isLoading} 
                  className="w-full sm:w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                Go Back & Edit
              </button>
              <button 
                  onClick={handleInitiatePayment} 
                  disabled={isLoading || totalAmount < 1.00} // Disable if total is less than 1 GHS
                  className="w-full sm:w-1/2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-green-300 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <Spinner /> <span className="ml-2">Processing...</span>
                  </div>
                 ) : `Confirm & Pay`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const ThankYouPage = ({ resetToHome, voterName }) => (
    <div className="text-center p-8 max-w-lg mx-auto">
        <svg className="mx-auto h-24 w-24 text-green-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-4">Thank You, {voterName}!</h2>
        <p className="text-lg text-gray-600 mt-2">Your vote has been successfully cast and recorded.</p>
        <p className="text-gray-500 mt-4">Your participation is greatly appreciated and makes a difference.</p>
        <button 
            onClick={resetToHome} 
            className="mt-8 py-3 px-8 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            Go back to Login
        </button>
    </div>
);


const PaymentStatusPage = ({ paymentReference, handleGoToAuth, voterName, setPage, voterId, callApi }) => {
    const [status, setStatus] = useState('pending'); // 'pending', 'success', 'failed'
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes timer
    const [apiError, setApiError] = useState(''); // State for API errors during polling

    // Polling logic to check payment status
    useEffect(() => {
        let timerId;
        let pollingId;

        const checkStatus = async () => {
             // Avoid double-checking if already resolved
             if (status !== 'pending') return;
             
            setApiError(''); // Clear previous API errors on new check
            try {
                // Call the backend function to check status (use skipLoading flag)
                const result = await callApi('checkPaymentStatus', { paymentReference: paymentReference }, true); // Added skipLoading flag

                if (result && result.status === 'success') {
                    const paymentStatus = result.paymentStatus; // e.g., 'SUCCESS', 'FAILED', 'PENDING'
                    
                    if (paymentStatus === 'SUCCESS') {
                        setStatus('success');
                        setPage('thankYou'); // SUCCESS: Move to the final Thank You page
                    } else if (paymentStatus === 'FAILED' || paymentStatus === 'FAILED_INITIATION' || paymentStatus === 'FAILED_CALLBACK') {
                        setStatus('failed'); // FAILED: Stay on this page but show error
                    } else {
                         // Still PENDING or UNKNOWN, keep polling
                         // Optional: Add logic for 'UNKNOWN' or other unexpected statuses
                    }
                } else {
                     // Handle cases where callApi itself failed (network error handled by callApi)
                     // or the backend returned { status: 'error' }
                     console.error("Polling API call failed or returned error status:", result);
                     // Keep status as 'pending' but show an error message maybe?
                     // Or just let it retry silently. Let's retry silently for now.
                }
            } catch (err) {
                 console.error("Error during checkPaymentStatus API call:", err);
                 setApiError("Temporary issue checking status. Retrying..."); // Inform user briefly
            }
        };

        // --- Timer Countdown ---
        if (status === 'pending' && timeLeft > 0) {
            timerId = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerId);
                        if (status === 'pending') setStatus('failed'); // Timeout results in failed
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        // --- API Polling (checks immediately, then every 5 seconds) ---
        if (status === 'pending' && timeLeft > 0) {
            checkStatus(); // Initial check immediately
            pollingId = setInterval(checkStatus, 5000); // Poll every 5 seconds
        }

        // Cleanup function runs when component unmounts or dependencies change
        return () => {
            clearInterval(timerId);
            clearInterval(pollingId);
        };
    // Rerun effect if status changes (e.g., from pending to success/failed)
    // or if timeLeft reaches 0. Also include dependencies needed by checkStatus.
    }, [status, timeLeft, paymentReference, voterId, setPage, callApi]); 


    const seconds = timeLeft % 60;
    const minutes = Math.floor(timeLeft / 60);

    // Dynamic icons and messages based on status
    const getStatusContent = () => {
        switch (status) {
            case 'pending':
                return {
                    icon: <svg className="mx-auto h-16 w-16 text-yellow-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
                    title: 'Action Required: Confirm Payment',
                    message: `A payment request has been sent to your MoMo number. Please approve the transaction within ${minutes}:${seconds < 10 ? '0' : ''}${seconds} on your phone. We are checking the status...`,
                    buttonText: 'Cancel & Return to Login'
                };
            case 'success': // Should not normally be seen as it redirects
                 return {
                     icon: <SuccessIcon />,
                     title: 'Payment Confirmed!',
                     message: `Redirecting...`, // User sees this briefly before redirect
                     buttonText: 'Start Over' // Should not be needed
                 };
            case 'failed':
                 return {
                     icon: <svg className="mx-auto h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
                     title: 'Payment Failed or Timed Out',
                     message: 'The transaction failed, was cancelled, or timed out. Please check your phone or balance and try voting again if you wish.',
                     buttonText: 'Try Voting Again'
                 };
            default: return {}; // Should not happen
        }
    };

    const { icon, title, message, buttonText } = getStatusContent();

    return (
        <div className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg max-w-lg mx-auto">
            {icon}
            <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-gray-900">
                {title}
            </h3>
            <p className="mt-2 text-gray-600">
                {message}
            </p>
            {status === 'pending' && paymentReference && (
                <p className="mt-4 text-sm text-indigo-600 font-medium break-all">Ref: {paymentReference}</p>
            )}
             {/* Display API errors briefly if they occur during polling */}
             {apiError && <p className="mt-3 text-sm text-red-600">{apiError}</p>}
            
            <button 
                onClick={handleGoToAuth} // Always goes back to auth page for simplicity
                className={`mt-6 py-2 px-6 rounded-md transition-colors text-white font-medium ${status === 'failed' ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'}`}
            >
                {buttonText}
            </button>
        </div>
    );
};


// --- Admin Components ---
// (AdminLoginPage and AdminPanel remain the same - omitted for brevity)
const AdminLoginPage = ({ handleAdminLogin, isLoading, resetToHome }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdminLogin(adminId, password);
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* Back button */}
      <button 
          onClick={resetToHome} 
          className="absolute top-0 left-0 -translate-y-1/2 translate-x-1 sm:-translate-x-12 text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back to voter login"
      >
        <BackArrowIcon />
      </button>
      
      <img src="https://i.imgur.com/PNCoI4w.png" alt="YPG Logo" className="mx-auto h-24 w-auto mb-6" />
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="adminId" className="block text-sm font-bold text-gray-700 mb-2">Admin ID</label>
          <input 
              id="adminId" 
              name="adminId" 
              type="text" 
              value={adminId} 
              onChange={(e) => setAdminId(e.target.value)} 
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              disabled={isLoading} 
              required
          />
        </div>
        <div className="relative">
          <label htmlFor="adminPassword" className="block text-sm font-bold text-gray-700 mb-2">Password</label>
          <input 
              id="adminPassword" 
              name="adminPassword" 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              disabled={isLoading} 
              required
          />
          <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        </div>
        <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

const AdminPanel = ({ dashboardData, adminName, handleLogout, handleAddGroup, handleDeleteGroup, handleAddCategory, handleDeleteCategory, handleAddSubCategory, handleDeleteSubCategory, handleAddCandidate, handleDeleteCandidate, handleDeleteVoter }) => {
  const [view, setView] = useState('results'); // Default view
  const [newGroupName, setNewGroupName] = useState('');
  const [newCategory, setNewCategory] = useState({ name: '', groupId: ''});
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [newCandidate, setNewCandidate] = useState({ name: '', categoryId: '', imageUrl: '' });
  
  // Handlers for form submissions
  const onAddGroup = (e) => { e.preventDefault(); if (!newGroupName.trim()) return; handleAddGroup(newGroupName); setNewGroupName(''); };
  const onAddCategory = (e) => { e.preventDefault(); if (!newCategory.name.trim() || !newCategory.groupId) return; handleAddCategory(newCategory); setNewCategory({ name: '', groupId: ''}); };
  const onAddSubCategory = (e) => { e.preventDefault(); if (!newSubCategoryName.trim()) return; handleAddSubCategory(newSubCategoryName); setNewSubCategoryName(''); };
  const onAddCandidate = (e) => { e.preventDefault(); if (!newCandidate.name.trim() || !newCandidate.categoryId) return; handleAddCandidate(newCandidate); setNewCandidate({ name: '', categoryId: '', imageUrl: '' }); };
  
  // Helper functions to get names from IDs for display
  const getGroupName = (groupId) => dashboardData?.groups?.find(g => g.GroupID === groupId)?.GroupName || 'Unknown Group';
  const getCategoryName = (categoryId) => dashboardData?.allCategoriesForCandidates?.find(c => c.CategoryID === categoryId || c.SubCategoryID === categoryId)?.CategoryName || dashboardData?.allCategoriesForCandidates?.find(c => c.CategoryID === categoryId || c.SubCategoryID === categoryId)?.SubCategoryName || 'Unknown Category/Award';

  // Loading state
  if (!dashboardData || !dashboardData.stats || !dashboardData.groups || !dashboardData.categories || !dashboardData.subCategories || !dashboardData.candidates || !dashboardData.voters || !dashboardData.results || !dashboardData.allCategoriesForCandidates) {
    return <div className="text-center p-10"><Spinner /> <p className="mt-2 text-gray-600">Loading dashboard data...</p></div>;
  }
  
  // Confirmation wrapper for delete actions
  const confirmAndDelete = (action, id, type) => {
      const messageMap = {
          group: 'Delete this group? This will also delete related categories and candidates.',
          category: 'Delete this category? This will also delete all candidates within it.',
          subCategory: 'Delete this local guilder award?',
          candidate: 'Delete this candidate?',
          voter: 'Delete this voter? This action cannot be undone.'
      };
      // IMPORTANT: Replace window.confirm with a custom modal in a real app
      // For this environment, we'll proceed without confirmation.
      // if (window.confirm(messageMap[type])) {
          action(id);
      // } else {
      //    console.log(`Deletion of ${type} ${id} cancelled.`);
      // }
  };

  return (
     <div className="w-full max-w-6xl mx-auto p-4 sm:p-0">
       {/* Header */}
       <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 border-b pb-4">
         <div>
             <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Panel</h1>
             <p className="text-gray-600">Welcome, {adminName}!</p>
         </div>
         <button 
             onClick={handleLogout} 
             className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
         >
             Logout
         </button>
       </div>
       
       {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-4 sm:space-x-6 overflow-x-auto" aria-label="Tabs">
            {['results', 'groups', 'categories', 'subCategories', 'candidates', 'voters'].map((tab) => (
               <button 
                   key={tab}
                   onClick={() => setView(tab)} 
                   className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors focus:outline-none ${view === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
               >
                   {tab === 'subCategories' ? 'Awards' : tab} 
               </button>
            ))}
          </nav>
        </div>
        
       {/* Tab Content */}
       <div className="mt-6">
         {/* Results View */}
         {view === 'results' && (
           <div className="space-y-8">
             {/* Stats Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow text-center"><h3 className="text-lg font-semibold text-gray-600">Total Registered Voters</h3><p className="text-4xl font-bold text-blue-800">{dashboardData.stats.totalVoters}</p></div>
               <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg shadow text-center"><h3 className="text-lg font-semibold text-gray-600">Unique Voters (Paid)</h3><p className="text-4xl font-bold text-green-800">{dashboardData.stats.totalVotesCast}</p></div>
               <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg shadow text-center"><h3 className="text-lg font-semibold text-gray-600">Turnout</h3><p className="text-4xl font-bold text-amber-800">{dashboardData.stats.turnout}%</p></div>
             </div>
             
             {/* Results by Group/Category */}
             {dashboardData.groups.map(group => (
               <div key={group.GroupID} className="bg-white p-4 sm:p-6 rounded-lg shadow border">
                 <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">{group.GroupName}</h2>
                 {(dashboardData.categories.filter(c => c.GroupID === group.GroupID).length > 0) ? (
                    dashboardData.categories.filter(c => c.GroupID === group.GroupID).map(category => {
                      const categoryResults = dashboardData.results.filter(r => r.categoryId === category.CategoryID)
                                               .sort((a, b) => b.totalAmount - a.totalAmount); // Sort descending by amount
                      const maxVotes = Math.max(...categoryResults.map(r => r.totalAmount), 0) || 1; // Avoid division by zero
                      return (
                        <div key={category.CategoryID} className="mb-6 last:mb-0">
                          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-700">{category.CategoryName}</h3>
                          <div className="space-y-4">
                            {categoryResults.length > 0 ? categoryResults.map((result, index) => (
                              <div key={result.id} className={`p-3 rounded-lg border ${index === 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50'}`}>
                                <div className="flex justify-between items-center mb-1">
                                  <p className="font-medium text-gray-800">{index + 1}. {result.name}</p>
                                  <p className="font-bold text-blue-600">GHS {result.totalAmount.toFixed(2)}</p>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                  <div 
                                      className={`${index === 0 ? 'bg-yellow-400' : 'bg-blue-600'} h-3 rounded-full transition-all duration-500 ease-out`}
                                      style={{ width: `${Math.max(1, (result.totalAmount / maxVotes) * 100)}%` }} // Ensure minimum 1% width for visibility
                                  ></div>
                                </div>
                              </div>
                            )) : <p className="text-gray-500 italic">No votes cast in this category yet.</p>}
                          </div>
                        </div>
                      )
                    })
                 ) : (
                     <p className="text-gray-500 italic">No categories defined for this group yet.</p>
                 )}
               </div>
             ))}
           </div>
         )}
         
         {/* Groups Management */}
         {view === 'groups' && (
           <div>
             <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Groups</h2>
             {/* Add New Group Form */}
             <form onSubmit={onAddGroup} className="bg-gray-50 p-4 rounded-lg border mb-8 flex flex-col sm:flex-row items-stretch gap-4">
               <label htmlFor="newGroupName" className="sr-only">New Group Name</label>
               <input 
                   id="newGroupName"
                   value={newGroupName} 
                   onChange={(e) => setNewGroupName(e.target.value)} 
                   placeholder="New Group Name" 
                   className="p-2 border rounded w-full flex-grow focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                   required 
               />
               <button type="submit" className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Add Group</button>
             </form>
             {/* Current Groups List */}
             <h3 className="text-xl font-semibold mb-4 text-gray-700">Current Groups</h3>
             <div className="space-y-2">
                 {dashboardData.groups.length > 0 ? dashboardData.groups.map(g => (
                    <div key={g.GroupID} className="flex justify-between items-center p-3 bg-white border rounded-lg shadow-sm">
                        <p className="text-gray-800">{g.GroupName} <span className="text-xs text-gray-400">({g.GroupID})</span></p>
                        <button onClick={() => confirmAndDelete(handleDeleteGroup, g.GroupID, 'group')} className="text-red-500 hover:text-red-700 font-medium text-sm focus:outline-none focus:underline">Delete</button>
                    </div>
                 )) : <p className="text-gray-500 italic">No groups created yet.</p>}
             </div>
           </div>
          )}

         {/* Categories Management */}
         {view === 'categories' && (
           <div>
             <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Categories</h2>
             {/* Add New Category Form */}
             <form onSubmit={onAddCategory} className="bg-gray-50 p-4 rounded-lg border mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
               <div>
                  <label htmlFor="newCategoryName" className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <input id="newCategoryName" value={newCategory.name} onChange={(e) => setNewCategory(p => ({...p, name: e.target.value}))} placeholder="Category Name" className="p-2 border rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
               </div>
                <div>
                   <label htmlFor="categoryGroup" className="block text-sm font-medium text-gray-700 mb-1">Assign to Group</label>
                   <select id="categoryGroup" value={newCategory.groupId} onChange={(e) => setNewCategory(p => ({...p, groupId: e.target.value}))} className="p-2 border rounded bg-white w-full h-[42px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                     <option value="">Select a Group...</option>
                     {dashboardData.groups.map(g => <option key={g.GroupID} value={g.GroupID}>{g.GroupName}</option>)}
                   </select>
                </div>
               <button type="submit" className="bg-blue-600 text-white p-2 rounded h-[42px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:col-start-3">Add Category</button>
             </form>
             {/* Current Categories List */}
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Current Categories</h3>
             <div className="space-y-2">
                 {dashboardData.categories.length > 0 ? dashboardData.categories.map(c => (
                     <div key={c.CategoryID} className="flex justify-between items-center p-3 bg-white border rounded-lg shadow-sm">
                         <p className="text-gray-800">{c.CategoryName} <span className="text-sm text-gray-500">({getGroupName(c.GroupID)})</span></p>
                         <button onClick={() => confirmAndDelete(handleDeleteCategory, c.CategoryID, 'category')} className="text-red-500 hover:text-red-700 font-medium text-sm focus:outline-none focus:underline">Delete</button>
                     </div>
                 )) : <p className="text-gray-500 italic">No categories created yet.</p>}
             </div>
           </div>
         )}
         
         {/* SubCategories (Awards) Management */}
         {view === 'subCategories' && (
           <div>
             <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Local Guilder Awards</h2>
              {/* Add New Award Form */}
             <form onSubmit={onAddSubCategory} className="bg-gray-50 p-4 rounded-lg border mb-8 flex flex-col sm:flex-row items-stretch gap-4">
                <label htmlFor="newSubCategoryName" className="sr-only">New Award Name</label>
               <input 
                   id="newSubCategoryName"
                   value={newSubCategoryName} 
                   onChange={(e) => setNewSubCategoryName(e.target.value)} 
                   placeholder="New Local Guilder Award Name (e.g., RIIS Congregation)" 
                   className="p-2 border rounded w-full flex-grow focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                   required 
               />
               <button type="submit" className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Add Award</button>
             </form>
             {/* Current Awards List */}
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Current Awards</h3>
             <div className="space-y-2">
                 {dashboardData.subCategories.length > 0 ? dashboardData.subCategories.map(sc => (
                     <div key={sc.SubCategoryID} className="flex justify-between items-center p-3 bg-white border rounded-lg shadow-sm">
                         <p className="text-gray-800">{sc.SubCategoryName} <span className="text-xs text-gray-400">({sc.SubCategoryID})</span></p>
                         <button onClick={() => confirmAndDelete(handleDeleteSubCategory, sc.SubCategoryID, 'subCategory')} className="text-red-500 hover:text-red-700 font-medium text-sm focus:outline-none focus:underline">Delete</button>
                     </div>
                 )) : <p className="text-gray-500 italic">No awards created yet.</p>}
             </div>
           </div>
          )}

         {/* Candidates Management */}
         {view === 'candidates' && (
           <div>
             <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Candidates</h2>
              {/* Add New Candidate Form */}
             <form onSubmit={onAddCandidate} className="bg-gray-50 p-4 rounded-lg border mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
               <div>
                  <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label>
                  <input id="candidateName" name="name" value={newCandidate.name} onChange={(e) => setNewCandidate(p => ({...p, name: e.target.value}))} placeholder="Full Name" className="p-2 border rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
               </div>
               <div>
                   <label htmlFor="candidateCategory" className="block text-sm font-medium text-gray-700 mb-1">Assign to Category/Award</label>
                   <select id="candidateCategory" name="categoryId" value={newCandidate.categoryId} onChange={(e) => setNewCandidate(p => ({...p, categoryId: e.target.value}))} className="p-2 border rounded bg-white w-full h-[42px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                     <option value="">Select Category/Award...</option>
                     {/* Combine categories and subcategories into one list for the dropdown */}
                     {dashboardData.allCategoriesForCandidates.map(c => <option key={c.CategoryID || c.SubCategoryID} value={c.CategoryID || c.SubCategoryID}>{c.CategoryName || c.SubCategoryName}</option>)}
                   </select>
               </div>
                <div>
                   <label htmlFor="candidateImageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
                   <input id="candidateImageUrl" name="imageUrl" value={newCandidate.imageUrl} onChange={(e) => setNewCandidate(p => ({...p, imageUrl: e.target.value}))} placeholder="https://example.com/image.jpg" className="p-2 border rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
               <button type="submit" className="bg-blue-600 text-white p-2 rounded h-[42px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Add Candidate</button>
             </form>
             {/* Current Candidates List */}
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Current Candidates</h3>
             <div className="space-y-2">
                 {dashboardData.candidates.length > 0 ? dashboardData.candidates.map(c => (
                     <div key={c.CandidateID} className="flex justify-between items-center p-3 bg-white border rounded-lg shadow-sm">
                         <div>
                            <p className="text-gray-800 font-medium">{c.Name}</p>
                            <p className="text-sm text-gray-500">{getCategoryName(c.CategoryID)}</p>
                            {c.ImageURL && <a href={c.ImageURL} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">View Image</a>}
                         </div>
                         <button onClick={() => confirmAndDelete(handleDeleteCandidate, c.CandidateID, 'candidate')} className="text-red-500 hover:text-red-700 font-medium text-sm focus:outline-none focus:underline">Delete</button>
                     </div>
                 )) : <p className="text-gray-500 italic">No candidates created yet.</p>}
             </div>
           </div>
         )}
         
         {/* Voters Management */}
         {view === 'voters' && (
           <div>
             <h2 className="text-2xl font-bold mb-4 text-gray-800">Registered Voters</h2>
             {/* Voters List */}
             <div className="space-y-2">
                {dashboardData.voters.length > 0 ? dashboardData.voters.map(v => (
                   <div key={v.VoterID} className="flex flex-col sm:flex-row justify-between sm:items-center p-3 bg-white border rounded-lg shadow-sm gap-2 sm:gap-4">
                       <div>
                            <p className="text-gray-800 font-medium">{v.Name} <span className="text-sm text-gray-500">({v.VoterID})</span></p>
                            <p className="text-xs text-gray-600">Phone: {v.Phone?.replace(/'/g, '') || 'N/A'}</p> {/* Remove leading quote for display */}
                            <p className={`text-xs font-semibold ${v.HasVoted === 'TRUE' ? 'text-green-600' : 'text-red-600'}`}>Voted: {v.HasVoted === 'TRUE' ? 'Yes' : 'No'}</p>
                       </div>
                       <button onClick={() => confirmAndDelete(handleDeleteVoter, v.VoterID, 'voter')} className="text-red-500 hover:text-red-700 font-medium text-sm focus:outline-none focus:underline self-start sm:self-center">Delete Voter</button>
                   </div>
                )) : <p className="text-gray-500 italic">No voters registered yet.</p>}
             </div>
           </div>
         )}
       </div>
       
     </div>
   )
};


// --- Main App Component ---
export default function App() {
  const [page, setPage] = useState('auth'); // 'auth', 'registrationSuccess', 'voting', 'paymentStatus', 'thankYou', 'adminLogin', 'adminPanel'
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [voterId, setVoterId] = useState('');
  const [voterName, setVoterName] = useState('');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [newlyRegisteredId, setNewlyRegisteredId] = useState('');
  const [votingData, setVotingData] = useState({ groups: [], subCategoryBallotSection: { title: '', subCategories: [] } });
  const [voteAmounts, setVoteAmounts] = useState({});
  const [momoNumber, setMomoNumber] = useState('');
  const [momoNetwork, setMomoNetwork] = useState('mtn-gh'); // Default network
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [paymentReference, setPaymentReference] = useState(''); // State to hold payment ref
  const [adminToken, setAdminToken] = useState(null);
  const [adminName, setAdminName] = useState('');
  const [dashboardData, setDashboardData] = useState(null); // For admin panel
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [candidateCategoryMap, setCandidateCategoryMap] = useState({}); // To map candidateID to categoryID/subCategoryID

  // Central API call function
  // Added skipLoading flag to prevent global spinner during background polling
  const callApi = async (action, data = {}, skipLoading = false) => {
    if (!skipLoading) setIsLoading(true); // Only set global loading if not skipping
    setError(''); // Clear previous errors on new call
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...data }),
        // Consider adding a timeout using AbortController for long requests
      });

      // Improved error handling based on response status
      if (!response.ok) {
          let errorMsg = `Network response was not ok (Status: ${response.status})`;
          try {
              const errorData = await response.json(); // Try to get error details from backend
              errorMsg = errorData.message || errorMsg; // Use backend message if available
          } catch (jsonError) {
              // If response is not JSON, use the status text
              errorMsg = `${errorMsg}: ${response.statusText}`;
          }
          throw new Error(errorMsg);
      }

      const result = await response.json();

      if (result.status === 'error') {
         // Handle backend's structured errors { status: 'error', message: '...' }
        setError(result.message);
        console.error("API Error from Backend:", result.message);
        return null; // Indicate failure
      }
      return result; // Success
    } catch (err) {
      console.error("API Call Failed:", err);
      // Set a user-friendly error message, keeping the original one you mentioned
      setError('Could not connect to the voting server. Please check your network and try again.');
      return null; // Indicate failure
    } finally {
      if (!skipLoading) setIsLoading(false); // Only clear global loading if not skipping
    }
  };


  // --- Voter Actions ---
  const handleLogin = async (e) => { 
      e.preventDefault(); 
      if (!voterId.trim()) {
          setError("Please enter your Voter ID.");
          return;
      }
      const result = await callApi('login', { voterId }); 
      if (result) { 
          // setVoterId(voterId); // Voter ID is already set via input state
          setVoterName(result.name); 
          fetchVotingData(); // Fetch data needed for the voting page
      } else {
           setVoterId(''); // Clear voter ID field on failed login
      }
  };

  const handleRegister = async (e) => { 
    e.preventDefault();
    if (!regName.trim()) {
        setError("Please enter your full name.");
        return;
    }
    if (!regPhone.trim() || !/^\d{10}$/.test(regPhone.trim())) { // Basic 10-digit validation
        setError("Please enter a valid 10-digit phone number.");
        return;
    } 
    const result = await callApi('registerVoter', { fullName: regName, phone: regPhone }); 
    if (result) { 
        setNewlyRegisteredId(result.voterId); 
        setRegName(''); // Clear form
        setRegPhone('');
        setPage('registrationSuccess'); 
    }
  };

  const fetchVotingData = async () => { 
      const result = await callApi('getVotingData'); 
      if(result && result.data) { 
          setVotingData(result.data); 
          
          // --- Build Candidate -> Category/SubCategory Map ---
          const newMap = {};
          // Process main categories
          result.data.groups?.forEach(g => {
              g.categories?.forEach(c => {
                  c.candidates?.forEach(cand => {
                      newMap[cand.CandidateID] = c.CategoryID; // Map CandidateID to CategoryID
                  });
              });
          });
          // Process sub-categories (awards)
          result.data.subCategoryBallotSection?.subCategories?.forEach(sc => {
              sc.candidates?.forEach(cand => {
                  newMap[cand.CandidateID] = sc.SubCategoryID; // Map CandidateID to SubCategoryID
              });
          });
          setCandidateCategoryMap(newMap);
          // --- End Map Building ---

          setPage('voting'); // Move to voting page only after data is loaded
      } else {
           // Handle failure to load voting data - maybe go back to auth?
           setError("Failed to load voting data. Please try logging in again.");
           setPage('auth');
      }
  };

  const handleReview = () => {
      // Ensure amounts are numbers and filter votes >= GHS 1.00
      const votesToSubmit = Object.entries(voteAmounts)
          .map(([id, amountStr]) => ({ id, amount: parseFloat(amountStr) || 0 }))
          .filter(({ amount }) => amount >= 1.00);

      if (votesToSubmit.length === 0) {
          setError("Please enter an amount of at least GHS 1.00 for one or more candidates to proceed.");
          window.scrollTo(0, 0); // Scroll to top to show error
          return;
      }
      setIsReviewModalOpen(true); // Open the review modal
  };

   // --- UPDATED Payment Initiation ---
  const handleInitiatePayment = async () => {
    // --- Step 1: Frontend Validation ---
    if (!momoNetwork) {
        setError("Please select a mobile money network.");
        return;
    }
    if (!momoNumber || !/^\d{10}$/.test(momoNumber)) {
        setError("Please enter a valid 10-digit phone number.");
        return;
    }
    const votes = Object.entries(voteAmounts)
      .map(([candidateId, amountStr]) => ({
          candidateId,
          amount: parseFloat(amountStr) || 0,
          categoryId: candidateCategoryMap[candidateId] || ''
      }))
      .filter(({ amount }) => amount >= 1.00);
    const totalAmount = votes.reduce((sum, vote) => sum + vote.amount, 0);
    if (totalAmount < 1.00) {
        setError("Total amount must be at least GHS 1.00 to proceed.");
        return;
    }

    // --- Step 2: Optimistic UI Update ---
    // Generate a temporary reference on the frontend (optional, backend can still generate its own)
    // You could use a library like `uuid` for better uniqueness if needed
    const tempReference = `TEMP-${voterId}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    console.log("Using temporary reference:", tempReference);

    setPaymentReference(tempReference); // Use this for polling immediately
    setIsReviewModalOpen(false);        // Close the modal
    setPage('paymentStatus');           // Go to polling page NOW

    // --- Step 3: Call Backend API in the Background ---
    // We don't necessarily need to wait for this response here anymore
    // We pass the tempReference so backend can potentially link it if needed
    setIsLoading(true); // Show loading briefly while the background call happens
    setError(''); // Clear previous errors

    try {
        console.log("Calling initiatePayment API in background...");
        const result = await callApi('initiatePayment', {
            voterId,
            voterName,
            votes,
            momoNumber,
            channel: momoNetwork,
            // Optional: Pass the temporary reference if your backend wants to log it
            // clientReferenceFrontend: tempReference
        }, true); // Use true for skipLoading to avoid messing with polling page UI

        if (result && result.paymentReference) {
            // Backend confirmed initiation and potentially provided its own reference
            // Update our reference state IF the backend provided one (it should)
            // This ensures polling uses the official reference from the backend
            console.log("Backend initiation successful, received official reference:", result.paymentReference);
            setPaymentReference(result.paymentReference);
        } else if (!result) {
            // The callApi function failed (network error, 5xx, etc.) or backend sent {status: 'error'}
            console.error("Background initiatePayment call failed.");
            // The error state *might* have been set by callApi if skipLoading was false, but we used true.
            // We need a way to show this critical failure on the polling page.
            // Option 1: Set error state here (might overwrite polling errors)
            // setError("Failed to start the payment process. Please try again.");
            // Option 2: Add specific state for initiation failure
            // setInitiationFailedError("Failed to start the payment process...");
            // Option 3: For now, just log it. Polling will likely timeout/fail anyway if initiation failed.
        } else {
             // Backend responded successfully but didn't return a reference (unexpected)
             console.warn("Backend responded to initiatePayment but did not return a paymentReference.");
             // Continue polling with the tempReference, hoping the callback still works.
        }

    } catch (err) {
        // Catch unexpected errors during the background call
        console.error("Unexpected error during background initiatePayment:", err);
        // Maybe set an error state here too
        // setError("An unexpected error occurred while starting payment.");
    } finally {
        setIsLoading(false); // Stop the brief loading indicator
    }
  };


  // --- Admin Actions ---
  const handleAdminLogin = async (adminId, password) => { 
      const result = await callApi('adminLogin', { adminId, password }); 
      if (result && result.token) { 
          setAdminToken(result.token); 
          setAdminName(result.name); 
          fetchAdminDashboardData(result.token); 
          // No need to setPage here, fetchAdminDashboardData does it on success
      }
  };

  const fetchAdminDashboardData = async (token) => { 
      const result = await callApi('getAdminDashboardData', { token }); 
      if (result && result.data) { 
          setDashboardData(result.data); 
          setPage('adminPanel'); // Go to admin panel on successful fetch
      } else {
           // Handle error fetching dashboard data
           setError("Failed to load admin dashboard. Please try again.");
           handleLogout(); // Log out if data fetch fails
      }
  };
  
  // Wrapper for admin actions that require refetching data
  const adminActionWrapper = async (action, data) => {
      const result = await callApi(action, { ...data, token: adminToken });
      if (result) {
          fetchAdminDashboardData(adminToken); // Refetch data on success
      } else {
           setError(`Failed to perform action: ${action}. Please check details and try again.`);
      }
  };

  const handleAddGroup = (groupName) => adminActionWrapper('addGroup', { groupName });
  const handleDeleteGroup = (groupId) => adminActionWrapper('deleteGroup', { groupId });
  const handleAddCategory = (categoryData) => adminActionWrapper('addCategory', { categoryName: categoryData.name, groupId: categoryData.groupId });
  const handleDeleteCategory = (categoryId) => adminActionWrapper('deleteCategory', { categoryId });
  const handleAddSubCategory = (subCategoryName) => adminActionWrapper('addSubCategory', { subCategoryName });
  const handleDeleteSubCategory = (subCategoryId) => adminActionWrapper('deleteSubCategory', { subCategoryId });
  const handleAddCandidate = (candidateData) => adminActionWrapper('addCandidate', { ...candidateData });
  const handleDeleteCandidate = (candidateId) => adminActionWrapper('deleteCandidate', { candidateId });
  const handleDeleteVoter = (voterIdToDelete) => adminActionWrapper('deleteVoter', { voterId: voterIdToDelete }); // Renamed parameter to avoid conflict
  
  const handleLogout = () => { 
      setAdminToken(null); 
      setAdminName(''); 
      setDashboardData(null); 
      setPage('auth'); 
      setAuthMode('login');
      setError(''); // Clear errors on logout
  };
  
  // --- Navigation & Reset ---
  const resetToHome = () => {
    // Reset all voter-specific state
    setVoterId('');
    setVoterName('');
    setVoteAmounts({});
    setMomoNumber('');
    // setMomoNetwork('mtn-gh'); // Keep default or reset as needed
    setPaymentReference(''); 
    
    // Reset registration state
    setRegName('');
    setRegPhone('');
    setNewlyRegisteredId('');
    
    // Reset modals and errors
    setError('');
    setIsReviewModalOpen(false); 
    
    // Reset page/auth state
    setAuthMode('login');
    setPage('auth'); // Go back to the main login/register page
  };
  
  // --- Page Rendering Logic ---
  const renderPage = () => {
    switch(page) {
      case 'auth': 
          return <AuthPage {...{ authMode, setAuthMode, voterId, setVoterId, handleLogin, regName, setRegName, regPhone, setRegPhone, handleRegister, isLoading, setError, setPage }} />;
      case 'registrationSuccess': 
          return <RegistrationSuccessPage {...{ newlyRegisteredId, handleGoToAuth: resetToHome }} />;
      case 'voting': 
          // Ensure votingData is loaded before rendering
          return votingData.groups.length > 0 || (votingData.subCategoryBallotSection?.subCategories?.length > 0) 
              ? <VotingPage {...{ voterName, votingData, voteAmounts, setVoteAmounts, handleReview, isLoading }} /> 
              : <div className="text-center p-10"><Spinner /><p className="mt-2 text-gray-600">Loading voting options...</p></div>; // Show loading if data isn't ready
      case 'paymentStatus':
          return <PaymentStatusPage {...{ paymentReference, handleGoToAuth: resetToHome, voterName, setPage, voterId, callApi }} />;
      case 'thankYou':
          return <ThankYouPage {...{ resetToHome, voterName }} />;
      case 'adminLogin': 
          return <AdminLoginPage {...{ handleAdminLogin, isLoading, resetToHome }} />;
      case 'adminPanel': 
          // Ensure dashboardData is loaded before rendering
          return dashboardData 
              ? <AdminPanel {...{ dashboardData, adminName, handleLogout, handleAddGroup, handleDeleteGroup, handleAddCategory, handleDeleteCategory, handleAddSubCategory, handleDeleteSubCategory, handleAddCandidate, handleDeleteCandidate, handleDeleteVoter }} /> 
              : <div className="text-center p-10"><Spinner /><p className="mt-2 text-gray-600">Loading admin dashboard...</p></div>; // Show loading if admin data isn't ready
      default: 
          console.warn("Invalid page state:", page);
          return <AuthPage {...{ authMode: 'login', setAuthMode, voterId, setVoterId, handleLogin, regName, setRegName, regPhone, setRegPhone, handleRegister, isLoading, setError, setPage }} />; // Default safely to login
    }
  }

  // --- Main Render ---
  return (
    // Main container with background and padding
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-inter"> 
      {/* Card container */}
      <div className="w-full bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
        {/* Global Error Display */}
        {error && (
            <div 
                className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg relative mb-6 shadow" 
                role="alert"
            >
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline ml-2">{error}</span>
                {/* Optional: Add a close button */}
                <button 
                    onClick={() => setError('')} 
                    className="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-700 hover:text-red-900"
                    aria-label="Close error message"
                >
                    <span className="text-2xl">&times;</span>
                </button>
            </div>
        )}
        
        {/* Render the current page */}
        {renderPage()}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} BED YPG E-Voting System. Powered by BTSytem Portal. All rights reserved.</p>
      </footer>

      {/* Review Modal (Rendered conditionally but outside the main page flow) */}
      <ReviewModal 
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          voteSummary={
            // Calculate summary only when modal is open or data changes
            useMemo(() => 
              Object.entries(voteAmounts)
                .map(([candidateId, amountStr]) => {
                    const amount = parseFloat(amountStr) || 0;
                    if (amount < 1.00) return null; // Exclude votes less than 1 GHS

                    let candidateName = 'Unknown Candidate';
                    let categoryName = 'Unknown Category';
                    
                    // Find candidate info efficiently (consider optimizing if many candidates)
                    let found = false;
                    votingData.groups?.forEach(g => {
                        g.categories?.forEach(c => {
                            const candidateInfo = c.candidates?.find(cand => cand.CandidateID === candidateId);
                            if (candidateInfo) {
                                candidateName = candidateInfo.Name;
                                categoryName = c.CategoryName;
                                found = true;
                            }
                        });
                    });
                    if (!found) {
                         votingData.subCategoryBallotSection?.subCategories?.forEach(sc => {
                             const candidateInfo = sc.candidates?.find(cand => cand.CandidateID === candidateId);
                              if (candidateInfo) {
                                  candidateName = candidateInfo.Name;
                                  categoryName = sc.SubCategoryName; // Use SubCategoryName for awards
                                  found = true;
                              }
                         });
                    }

                    return { candidateId, candidateName, categoryName, amount };
                })
                .filter(vote => vote !== null) // Remove null entries
                .sort((a,b) => a.categoryName.localeCompare(b.categoryName) || a.candidateName.localeCompare(b.candidateName)) // Sort for consistency
            , [voteAmounts, votingData, isReviewModalOpen]) // Recalculate if these change
          }
          momoNumber={momoNumber}
          setMomoNumber={setMomoNumber}
          momoNetwork={momoNetwork}
          setMomoNetwork={setMomoNetwork}
          handleInitiatePayment={handleInitiatePayment}
          isLoading={isLoading} // Pass loading state to modal
      />
    </div>
  );
}