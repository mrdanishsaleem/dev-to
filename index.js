// Random Code to show how push works

const users = [
    { id: 1, name: 'glenn' },
    { id: 2, name: 'pat' }
];

const newUser = users.push({ id: 3, name: 'adam' });

console.log(newUser);
