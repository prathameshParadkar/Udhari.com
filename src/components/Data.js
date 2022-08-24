import ppImg from './images/profile-pic.png'
const Data = [
    {
        userId : 1,
        username : "random",
        password : "qwerty",
        entries : [
            {
            entryId : 1,
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
                amount : 20
            }
        },

            {
                id : 2,
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

        ]
        

        },
    {
        userId : 2,
        username : "something",
        password : "asdfgh",
        entries : [
            {
            entryId : 1,
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
                id : 2,
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