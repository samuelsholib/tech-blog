const { Comment } = require('../models');
const commentData = [{
        "comment_content": "Great",
        "user_id": "1",
        "post_id": "1"
    },
    {
        "comment_content": "Gizmodo; tech and politics!!!",
        "user_id": "2",
        "post_id": "2"


    },
    {
        "comment_content": "Sounded like CNET is great tool to have",
        "user_id": "3",
        "post_id": "3"

    },
    {
        "comment_content": "This is a great news!!!",
        "user_id": "4",
        "post_id": "4"
    },
    {
        "comment_content": " Wired, thanks for researching the effect of technologies on culture, economy and politics",
        "user_id": "5",
        "post_id": "5"
    },

]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;