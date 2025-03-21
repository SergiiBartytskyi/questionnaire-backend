export const getGreetingController = async (req, res) => {
  res.send('<h1>Welcome to Questionnaire Builder App</h1>');
  res.json({
    status: 200,
    message: 'Hello in my Questionnaire-DB!',
  });
};
