import React, { useState, useMemo } from 'react';

// --- Configuration ---
// THIS IS THE MOST IMPORTANT STEP.
// You MUST replace this with the new URL you get after deploying the backend script.
const API_URL = "https://script.google.com/macros/s/AKfycbzQ0oM_64E63oxab6A-IUMZLT0U5HytIHqSawpXy2-xIFrvhPP_cfZPkrd8g5W67MW-yg/exec";

// --- SVG Icons ---
const BackArrowIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const EyeOpenIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>);
const EyeClosedIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .847 0 1.67.111 2.458.325" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.589 17.589A5.982 5.982 0 0112 15a5.982 5.982 0 01-5.589-2.411m-1.175-1.175A9.953 9.953 0 002.458 12c1.274 4.057 5.064 7 9.542 7a9.953 9.953 0 003.39-1.002m-1.175-1.175l-4.243-4.243m4.243 4.243a3 3 0 00-4.243-4.243m0 0l-4.243-4.243" /></svg>);
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
    const sanitizedValue = value.match(/^[0-9]*\.?[0-9]{0,2}$/);
    if (sanitizedValue || value === '') {
      setVoteAmounts(prev => ({ ...prev, [candidateId]: value }));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Welcome, {voterName}{`\u00A0!`}</h1>
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

const ReviewModal = ({ isOpen, onClose, voteSummary, momoNumber, setMomoNumber, handleInitiatePayment, isLoading }) => {
  const totalAmount = useMemo(() => {
    return voteSummary.reduce((sum, vote) => sum + vote.amount, 0);
  }, [voteSummary]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Review Your Votes</h2>
        <div className="max-h-60 overflow-y-auto space-y-2 mb-4 pr-2">
          {voteSummary.map((vote, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <p className="font-semibold">{vote.candidateName} <span className="text-gray-500">({vote.categoryName})</span></p>
              <p>GHS {vote.amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between font-bold text-lg mb-4">
            <p>Total Amount:</p>
            <p>GHS {totalAmount.toFixed(2)}</p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="momoNumber" className="block text-sm font-bold text-gray-700 mb-1">MTN MoMo Number</label>
              <input type="tel" id="momoNumber" name="momoNumber" value={momoNumber} onChange={(e) => setMomoNumber(e.target.value)} className="w-full rounded-md border-gray-300 py-2 px-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., 0244123456" />
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button onClick={onClose} disabled={isLoading} className="w-full sm:w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg">
                  Go Back & Edit
                </button>
                <button onClick={handleInitiatePayment} disabled={isLoading} className="w-full sm:w-1/2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-green-300">
                  {isLoading ? 'Processing...' : `Confirm & Pay`}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const ConfirmationModal = ({ isOpen, handleGoToAuth }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md text-center">
        <SuccessIcon />
        <h1 className="text-2xl sm:text-3xl font-bold mt-4 mb-2">Thank You!</h1>
        <p className="text-gray-600 text-lg mb-8">Your vote has been successfully recorded.</p>
        <button onClick={handleGoToAuth} className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg">
          Go to Homepage
        </button>
      </div>
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

const AdminPanel = ({ dashboardData, adminName, handleLogout, handleAddGroup, handleDeleteGroup, handleAddCategory, handleDeleteCategory, handleAddSubCategory, handleDeleteSubCategory, handleAddCandidate, handleDeleteCandidate, handleDeleteVoter }) => {
  const [view, setView] = useState('results');
  const [newGroupName, setNewGroupName] = useState('');
  const [newCategory, setNewCategory] = useState({ name: '', groupId: ''});
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [newCandidate, setNewCandidate] = useState({ name: '', categoryId: '', imageUrl: '' });

  const onAddGroup = (e) => { e.preventDefault(); if (!newGroupName) return; handleAddGroup(newGroupName); setNewGroupName(''); };
  const onAddCategory = (e) => { e.preventDefault(); if (!newCategory.name || !newCategory.groupId) return; handleAddCategory(newCategory); setNewCategory({ name: '', groupId: ''}); };
  const onAddSubCategory = (e) => { e.preventDefault(); if (!newSubCategoryName) return; handleAddSubCategory(newSubCategoryName); setNewSubCategoryName(''); };
  const onAddCandidate = (e) => { e.preventDefault(); if (!newCandidate.name || !newCandidate.categoryId) return; handleAddCandidate(newCandidate); setNewCandidate({ name: '', categoryId: '', imageUrl: '' }); };
  
  const getGroupName = (groupId) => dashboardData.groups.find(g => g.GroupID === groupId)?.GroupName || 'Unknown';
  const getCategoryName = (categoryId) => dashboardData.allCategoriesForCandidates.find(c => c.CategoryID === categoryId)?.CategoryName || 'Unknown';

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
           <button onClick={() => setView('results')} className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${view === 'results' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Results</button>
           <button onClick={() => setView('groups')} className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${view === 'groups' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Groups</button>
           <button onClick={() => setView('categories')} className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${view === 'categories' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Categories</button>
           <button onClick={() => setView('subCategories')} className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${view === 'subCategories' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Sub-Categories</button>
           <button onClick={() => setView('candidates')} className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${view === 'candidates' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Candidates</button>
           <button onClick={() => setView('voters')} className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${view === 'voters' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Voters</button>
         </nav>
       </div>
       
      {view === 'results' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-100 p-4 rounded-lg text-center"><h3 className="text-lg font-semibold text-gray-600">Total Voters</h3><p className="text-4xl font-bold">{dashboardData.stats.totalVoters}</p></div>
            <div className="bg-gray-100 p-4 rounded-lg text-center"><h3 className="text-lg font-semibold text-gray-600">Unique Voters</h3><p className="text-4xl font-bold">{dashboardData.stats.totalVotesCast}</p></div>
            <div className="bg-gray-100 p-4 rounded-lg text-center"><h3 className="text-lg font-semibold text-gray-600">Turnout</h3><p className="text-4xl font-bold">{dashboardData.stats.turnout}%</p></div>
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
                      <div className="space-y-4">{categoryResults.length > 0 ? categoryResults.map(c => (<div key={c.id} className="bg-white p-4 rounded-lg border"><div className="flex justify-between items-center mb-2"><p className="font-bold text-lg">{c.name}</p><p className="font-bold text-lg">GHS {c.totalAmount.toFixed(2)}</p></div><div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-blue-600 h-4 rounded-full" style={{ width: `${(c.totalAmount / maxVotes) * 100}%` }}></div></div></div>)) : <p className="text-gray-500">No votes cast in this category yet.</p>}</div>
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
      {view === 'voters' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Registered Voters</h2>
           <div className="space-y-2">{dashboardData.voters.map(v => (<div key={v.VoterID} className="flex justify-between items-center p-3 bg-white border rounded-lg"><p>{v.Name} ({v.VoterID}) - Voted: {String(v.HasVoted)}</p><button onClick={() => handleDeleteVoter(v.VoterID)} className="text-red-500 hover:text-red-700 font-medium">Delete</button></div>))}</div>
        </div>
      )}
     </div>
  )
};

// --- Main App Component ---
export default function App() {
  const [page, setPage] = useState('auth');
  const [authMode, setAuthMode] = useState('login');
  const [voterId, setVoterId] = useState('');
  const [voterName, setVoterName] = useState('');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [newlyRegisteredId, setNewlyRegisteredId] = useState('');
  const [votingData, setVotingData] = useState({ groups: [], subCategoryBallotSection: { title: '', subCategories: [] } });
  const [voteAmounts, setVoteAmounts] = useState({});
  const [momoNumber, setMomoNumber] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [adminToken, setAdminToken] = useState(null);
  const [adminName, setAdminName] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [candidateCategoryMap, setCandidateCategoryMap] = useState({});

  const callApi = async (action, data = {}) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action, ...data }),
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      });
      if (!response.ok) throw new Error(`Network response was not ok`);
      const result = await response.json();
      if (result.status === 'error') {
        setError(result.message);
        return null;
      }
      return result;
    } catch (err) {
      console.error("API Call Failed:", err);
      setError('Could not connect to the voting server. Please check your network and try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

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
  const handleRegister = async (e) => { e.preventDefault(); const result = await callApi('registerVoter', { fullName: regName, phone: regPhone }); if (result) { setNewlyRegisteredId(result.voterId); setPage('registrationSuccess'); }};
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
  const handleInitiatePayment = async () => {
    if (!momoNumber || !/^\d{10}$/.test(momoNumber)) {
      setError("Please provide your full 10-digit contact number.");
      return;
    }
    const votes = Object.entries(voteAmounts)
      .filter(([_, amount]) => parseFloat(amount) >= 1.00)
      .map(([candidateId, amount]) => ({
         candidateId, 
         amount: parseFloat(amount), 
         categoryId: candidateCategoryMap[candidateId] || ''
      }));
      
    const result = await callApi('initiatePayment', { voterId, votes, momoNumber });
    if (result) {
      setIsReviewModalOpen(false);
      setIsConfirmationModalOpen(true);
    }
  };


  const handleAdminLogin = async (adminId, password) => { const result = await callApi('adminLogin', { adminId, password }); if (result) { setAdminToken(result.token); setAdminName(result.name); fetchAdminDashboardData(result.token); }};
  const fetchAdminDashboardData = async (token) => { const result = await callApi('getAdminDashboardData', { token }); if (result) { setDashboardData(result.data); setPage('adminPanel'); }};
  const handleAddGroup = async (groupName) => { const result = await callApi('addGroup', { groupName, token: adminToken }); if (result) fetchAdminDashboardData(adminToken); };
  const handleDeleteGroup = async (groupId) => { if(window.confirm('Delete this group? This will also delete related categories and candidates.')) { const result = await callApi('deleteGroup', { groupId, token: adminToken }); if (result) fetchAdminDashboardData(adminToken); }};
  const handleAddCategory = async (categoryData) => { const result = await callApi('addCategory', { categoryName: categoryData.name, groupId: categoryData.groupId, token: adminToken }); if (result) fetchAdminDashboardData(adminToken); };
  const handleDeleteCategory = async (categoryId) => { if(window.confirm('Delete this category? This will also delete all candidates within it.')) { const result = await callApi('deleteCategory', { categoryId, token: adminToken }); if (result) fetchAdminDashboardData(adminToken); }};
  const handleAddSubCategory = async (subCategoryName) => { const result = await callApi('addSubCategory', { subCategoryName, token: adminToken }); if (result) fetchAdminDashboardData(adminToken); };
  const handleDeleteSubCategory = async (subCategoryId) => { if(window.confirm('Delete this award?')) { const result = await callApi('deleteSubCategory', { subCategoryId, token: adminToken }); if (result) fetchAdminDashboardData(adminToken); }};
  const handleAddCandidate = async (candidateData) => { const result = await callApi('addCandidate', { ...candidateData, token: adminToken }); if (result) fetchAdminDashboardData(adminToken); };
  const handleDeleteCandidate = async (candidateId) => { if (window.confirm('Delete this candidate?')) { const result = await callApi('deleteCandidate', { candidateId, token: adminToken }); if (result) fetchAdminDashboardData(adminToken); }};
  const handleDeleteVoter = async (voterId) => { if (window.confirm('Delete this voter?')) { const result = await callApi('deleteVoter', { voterId, token: adminToken }); if (result) fetchAdminDashboardData(adminToken); }};
  const handleLogout = () => { setAdminToken(null); setAdminName(''); setDashboardData(null); setPage('auth'); };
  
  const resetToHome = () => {
    setVoterId('');
    setVoterName('');
    setVoteAmounts({});
    setRegName('');
    setRegPhone('');
    setError('');
    setAuthMode('login');
    setPage('auth');
    setIsConfirmationModalOpen(false);
  };
  
  const renderPage = () => {
    switch(page) {
      case 'auth': return <AuthPage {...{ authMode, setAuthMode, voterId, setVoterId, handleLogin, regName, setRegName, regPhone, setRegPhone, handleRegister, isLoading, setError, setPage }} />;
      case 'registrationSuccess': return <RegistrationSuccessPage {...{ newlyRegisteredId, handleGoToAuth: resetToHome }} />;
      case 'voting': return <VotingPage {...{ voterName, votingData, voteAmounts, setVoteAmounts, handleReview, isLoading }} />;
      case 'adminLogin': return <AdminLoginPage {...{ handleAdminLogin, isLoading, resetToHome }} />;
      case 'adminPanel': return dashboardData ? <AdminPanel {...{ dashboardData, adminName, handleLogout, handleAddGroup, handleDeleteGroup, handleAddCategory, handleDeleteCategory, handleAddSubCategory, handleDeleteSubCategory, handleAddCandidate, handleDeleteCandidate, handleDeleteVoter }} /> : <div className="text-center"><Spinner /><p className="mt-2 text-gray-600">Loading dashboard data...</p></div>;
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

      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
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
        handleInitiatePayment={handleInitiatePayment}
        isLoading={isLoading}
      />
      <ConfirmationModal 
        isOpen={isConfirmationModalOpen}
        handleGoToAuth={resetToHome}
      />
    </div>
  );
}

