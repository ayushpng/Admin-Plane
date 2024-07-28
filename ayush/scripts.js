document.addEventListener('DOMContentLoaded', () => {
    loadMembersFromStorage();
    setupNavLinks();
});

document.getElementById('addMemberForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addMember();
});

document.getElementById('checkStatusForm').addEventListener('submit', function(event) {
    event.preventDefault();
    checkStatus();
});

function addMember() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const gender = document.getElementById('gender').value;
    const pack = document.getElementById('pack').value;
    const registrationDate = document.getElementById('registrationDate').value;

    const member = {
        id: `${name}-${registrationDate}`,  // Unique identifier
        name,
        age,
        phoneNumber,
        gender,
        pack,
        registrationDate,
        daysRemaining: calculateDaysRemaining(registrationDate)
    };

    const members = getMembersFromStorage();
    members.push(member);
    saveMembersToStorage(members);
    displayMembers();

    document.getElementById('addMemberForm').reset();
}

function calculateDaysRemaining(registrationDate) {
    const registration = new Date(registrationDate);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - registration.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return 30 - differenceInDays;
}

function deleteMember(memberId) {
    const members = getMembersFromStorage();
    const updatedMembers = members.filter(member => member.id !== memberId);
    saveMembersToStorage(updatedMembers);
    displayMembers();
}

function getMembersFromStorage() {
    const members = localStorage.getItem('members');
    return members ? JSON.parse(members) : [];
}

function saveMembersToStorage(members) {
    localStorage.setItem('members', JSON.stringify(members));
}

function loadMembersFromStorage() {
    displayMembers();
}

function displayMembers() {
    const membersList = document.getElementById('membersList');
    const members = getMembersFromStorage();
    membersList.innerHTML = '';

    if (members.length === 0) {
        membersList.innerHTML = '<p>No members available.</p>';
    } else {
        // Sort members by daysRemaining in ascending order
        members.sort((a, b) => a.daysRemaining - b.daysRemaining);

        members.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.classList.add('member');
            memberElement.innerHTML = `
                <p><strong>Name:</strong> ${member.name}</p>
                <p><strong>Age:</strong> ${member.age}</p>
                <p><strong>Phone Number:</strong> ${member.phoneNumber}</p>
                <p><strong>Gender:</strong> ${member.gender}</p>
                <p><strong>Pack:</strong> ${member.pack}</p>
                <p><strong>Registration Date:</strong> ${member.registrationDate}</p>
                <p><strong>Days Remaining:</strong> ${calculateDaysRemaining(member.registrationDate)}</p>
                <button class="delete-button" onclick="deleteMember('${member.id}')">Delete</button>
            `;
            membersList.appendChild(memberElement);
        });
    }
}

function checkStatus() {
    const searchName = document.getElementById('searchName').value.toLowerCase();
    const searchResult = document.getElementById('searchResult');
    const members = getMembersFromStorage();

    const filteredMembers = members.filter(member => member.name.toLowerCase() === searchName);

    searchResult.innerHTML = '';

    if (filteredMembers.length === 0) {
        searchResult.innerHTML = '<p>No member found with that name.</p>';
    } else {
        filteredMembers.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.classList.add('member');
            memberElement.innerHTML = `
                <p><strong>Name:</strong> ${member.name}</p>
                <p><strong>Age:</strong> ${member.age}</p>
                <p><strong>Phone Number:</strong> ${member.phoneNumber}</p>
                <p><strong>Gender:</strong> ${member.gender}</p>
                <p><strong>Pack:</strong> ${member.pack}</p>
                <p><strong>Registration Date:</strong> ${member.registrationDate}</p>
                <p><strong>Days Remaining:</strong> ${calculateDaysRemaining(member.registrationDate)}</p>
            `;
            searchResult.appendChild(memberElement);
        });
    }
}

function setupNavLinks() {
    document.getElementById('membersInfoLink').addEventListener('click', function() {
        document.querySelector('.members-info').style.display = 'block';
        document.querySelector('.add-member').style.display = 'none';
        document.querySelector('.check-status').style.display = 'none';
    });

    document.getElementById('addMemberLink').addEventListener('click', function() {
        document.querySelector('.members-info').style.display = 'none';
        document.querySelector('.add-member').style.display = 'block';
        document.querySelector('.check-status').style.display = 'none';
    });

    document.getElementById('checkStatusLink').addEventListener('click', function() {
        document.querySelector('.members-info').style.display = 'none';
        document.querySelector('.add-member').style.display = 'none';
        document.querySelector('.check-status').style.display = 'block';
    });
}
