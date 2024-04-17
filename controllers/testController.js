import User from "../models/user.schema.js";

// Sample questions data (for demonstration purposes)
const questions = [
    { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', options: ['Lorem', 'Ipsum', 'Dolor', 'Sit'], answer: 'Lorem' },
    { id: 2, text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas?', options: ['Pellentesque', 'Habitant', 'Morbi', 'Tristique'], answer: 'Pellentesque' },
    { id: 3, text: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh?', options: ['Fusce', 'Dapibus', 'Tellus', 'Cursus'], answer: 'Fusce' },
    { id: 4, text: 'Nullam id dolor id nibh ultricies vehicula ut id elit?', options: ['Nullam', 'Id', 'Dolor', 'Nibh'], answer: 'Nullam' },
    { id: 5, text: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam?', options: ['Cras', 'Justo', 'Odio', 'Dapibus'], answer: 'Cras' },
    { id: 6, text: 'Curabitur blandit tempus porttitor?', options: ['Curabitur', 'Blandit', 'Tempus', 'Porttitor'], answer: 'Curabitur' },
    { id: 7, text: 'Maecenas sed diam eget risus varius blandit sit amet non magna?', options: ['Maecenas', 'Sed', 'Diam', 'Risus'], answer: 'Maecenas' },
    { id: 8, text: 'Donec ullamcorper nulla non metus auctor fringilla?', options: ['Donec', 'Ullamcorper', 'Nulla', 'Non'], answer: 'Donec' },
    { id: 9, text: 'Vestibulum id ligula porta felis euismod semper?', options: ['Vestibulum', 'Id', 'Ligula', 'Porta'], answer: 'Vestibulum' },
    { id: 10, text: 'Sed posuere consectetur est at lobortis?', options: ['Sed', 'Posuere', 'Consectetur', 'Est'], answer: 'Sed' }
];

// Keep track of user progress and score (for demonstration purposes)
let userProgress = 0;
let userScore = 0;

// Route to send questions to the user
export const questionTest = async (req, res) => {
    try {
        // Send the next set of five questions
        const nextQuestions = questions.slice(userProgress, userProgress + 5);
        userProgress += 5;
        if (userProgress >= 10) {
            userProgress = 0; // Reset progress if all questions have been answered
        }

        console.log("User progress:", userProgress); // Debugging output

        res.json(nextQuestions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Route to receive answers from the user
export const answersTest = async (req, res) => {
    const userAnswers = req.body.answers;
    const userId = req.params.userId;

    try {
        // Fetch the user by ID
        const user = await User.findById(userId);

        // Calculate score based on user answers
        userAnswers.forEach((userAnswer, index) => {
            const questionIndex = userProgress - 5 + index;
            if (questions[questionIndex] && questions[questionIndex].answer === userAnswer) {
                userScore += 1;
            }
        });

        // Update user's test score if user exists
        if (user) {
            if (userScore >= 5) {
                user.myTest = userScore;
                // Save the updated user document
                console.log('test marks', user.myTest)
                await user.save();
            }
        }

        // Respond with the current score and progress
        res.json({ score: userScore, progress: userProgress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
