import ppImg from './images/profile-pic.png'

// Data is an array of user.
// each user has some enteries as in the tiles.

// Data[0] is first user has 3 enteries
// Data[1] is 2nd user has 2 enteries

const Data = [
    {
        userId : 1, //user details 
        username : "random", //user details
        password : "qwerty", //user details
        entries : [ // this user's entry details
            {
            entryId : 1, // this is first user's entry 1
            entryName : "John Doe",
            entryImg : {ppImg} ,
            personalDetails : {
                contact : "123456891",
                email : "smth@gmail.com",
                Address : "New York, America",
                upiId : "78@apl"
            },
            udhari : {
                entryStatus : "Udhari_to_pay",
                amount : 100
            }
        },

            {
                entryId : 2, // this is first user's entry 2
                entryName : "Shoe momo",
                personalDetails : {
                    contact : "123456891",
                    email : "smth@gmail.com",
                    Address : "New York, America",
                    upiId : "78@apl"
                },
                udhari : {
                    entryStatus : "Udhari_to_get",
                    amount : 10
                }
            },
            {
                entryId : 3, // this is first user's entry 3
                entryName : "karen karen",
                personalDetails : {
                    contact : "123456891",
                    email : "smth@gmail.com",
                    Address : "New York, America",
                    upiId : "78@apl"
                },
                udhari : {
                    entryStatus : "Udhari_to_pay",
                    amount : 35
                }
            }

        ]
        

        },
    {
        userId : 2, //2nd User (He will login differently and have different login credentials)
        username : "something",
        password : "asdfgh",
        entries : [
            {
            entryId : 1, // 2nd user's entry 1
            entryName : "Joe mama",
            personalDetails : {
                contact : "123456891",
                email : "smth@gmail.com",
                Address : "New York, America",
                upiId : "78@apl"
            },
            udhari : {
                entryStatus : "Udhari_to_pay",
                amount : 20
            }
        },

            {
                id : 2, // 2nd user's entry 1
                entryName : "Prathamesh Paradkar",
                personalDetails : {
                    contact : "123456891",
                    email : "smth@gmail.com",
                    Address : "New York, America",
                    upiId : "78@apl"
                },
                udhari : {
                    entryStatus : "Udhari_to_get",
                    amount : 10
                }
            }
        ]
        

        }
]
    
export default Data;