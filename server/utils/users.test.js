const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Petros',
      room: 'love'
    },
    {
      id: '2',
      name: 'Sam',
      room: 'hate'
    },
    {
      id: '3',
      name: 'Evita',
      room: 'love'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Petros',
      room: 'love'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for love room', () => {
    var userList = users.getUserList('love');

    expect(userList).toEqual(['Petros', 'Evita']);
  });

  it('should return names for hate room', () => {
    var userList = users.getUserList('hate');

    expect(userList).toEqual(['Sam']);
  });

  it('should remove a user', () => {
    var userId = '2';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var userId = '4';
    var user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '1';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = '4';
    var user = users.getUser(userId);

    expect(user).toBeFalsy();
  });
})
