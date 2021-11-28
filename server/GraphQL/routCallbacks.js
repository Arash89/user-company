const UserModel = require('../user_model')
const CompanyModel = require('../company_model')

const onceCallback = (req, res) => {
  UserModel.update({}, { companyName: "" }, { multi: true }, function (err, raw) {
    if (err) return handleError(err);
    console.log('The raw response from Mongo was ', raw);
  });
  console.red('jus once')
}

// add user through the search query
const addUserCallback = (req, res) => {
  console.yellow("querySelector: ", JSON.stringify(req.query))
  console.yellow("req: ", req.query)
  const requestArr = Object.entries(req.query)
  res.send(`<h1>${requestArr.map(([key, value]) => "Key: " + key + " Value: " + value)}</h1>`)
  const { firstName, age } = req.query
  console.yellow('Frist Name: ', firstName)
  console.yellow('age: ', age)

  const newUser = new UserModel({ firstName, age })
  console.cyan(newUser)
  newUser.save()

}

const updateUserFormResultCallBack = (req, res) => {
  console.blue('------------------------- Update user -------------------------')
  // UserModel.findOneAndUpdate({firstName: req.body.name}, {company: req.body.companyName})
  console.yellow("user name", req.body.firstName)
  console.yellow("user age", req.body.age)
  console.yellow("user company", req.body.companyName)
  UserModel.findOneAndUpdate({ firstName: req.body.firstName }, {
    $set: {
      companyName: req.body.companyName
    }
  }).then(function (current) {
    console.red(current)
  })

  console.log("update is done 2")
}

const addUserFormResultCallBack = (req, res) => {
  console.blue('++++++++++++++++++++++++++ Add user ++++++++++++++++++++++++++')
  console.yellow("user name", req.body.firstName)
  console.yellow("user age", req.body.age)
  console.yellow("user company", req.body.companyName)
  const newUser = new UserModel({
    firstName: req.body.firstName,
    age: req.body.age,
    companyName: req.body.companyName
  })
  newUser.save()
    .then(() => {
      console.log('User Model: ', newUser)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  console.log("User is added")
}

const addCompanyFormResultCallback = (req, res) => {
  console.yellow("user name", req.body.companyName)
  console.yellow("user name", req.body.description)
  const companyInstance = new CompanyModel({
    companyName: req.body.companyName,
    description: req.body.description
  })

  companyInstance.save()
}


const formAddCallback = (req, res) => {
  console.log("Inside ADD")
  res.render("./userUpdateForm", {
    addUser: true,
    pageTitle: "Salam",
    companyName: [
      { companyName: 'Apple', id: '619dcc1881f09e3a1b837d74' },
      { companyName: 'Google', id: '619dcc7d81f09e3a1b837d76' },
      { companyName: 'Adobe', id: '619dcbd781f09e3a1b837d72' },
    ]
  })
}

const formUpdateCallback = (req, res) => {
  console.log("Inside the update")
  res.render("./userUpdateForm", {
    updateUser: true,
    pageTitle: "Salam",
    companyName: [
      { companyName: 'Apple', id: '619dcc1881f09e3a1b837d74' },
      { companyName: 'Google', id: '619dcc7d81f09e3a1b837d76' },
      { companyName: 'Adobe', id: '619dcbd781f09e3a1b837d72' },
    ]
  })
}

module.exports = {
  onceCallback,
  addUserCallback,
  updateUserFormResultCallBack,
  addUserFormResultCallBack,
  addCompanyFormResultCallback,
  formAddCallback,
  formUpdateCallback,
}
