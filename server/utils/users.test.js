const expect = require ('expect');
const {Users} = require ('./users');


describe('Users Class', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: "bryan",
            room: "node"
        }, {
            id: 2,
            name: "florent",
            room: "node"
        }, {
            id: 3,
            name: "emilie",
            room: "node"
        }, {
            id: 4,
            name: "nils",
            room: "stras"
        }]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 12345,
            name: "bryan",
            room: "local"
        }
        var resUser = users.addUser(user.id, user.name, user.room)
        expect(users.users).toEqual([user]);
    })

    
    it ('should remove a user', () => {
        var userId = 1;
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(3);

    });

    it ('should not remove a user', () => {
        var userId = 99;
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(4);
    });

    it ('should find a user', () => {
        var userId = 1;
        var user = users.getUser(userId);
        
        expect(user.id).toEqual(userId)
    });

    it ('should not find user', () => {
        var userId = 99;
        var user = users.getUser(userId);
        
        expect(user).toNotExist();
    });



    it('should return names for node room', () => {
        var userList = users.getUserList('node');
        expect(userList).toEqual(['bryan', 'florent', 'emilie']);
    })

    it('should return names for stras room', () => {
        var userList = users.getUserList('stras');
        expect(userList).toEqual(['nils']);
    })
})