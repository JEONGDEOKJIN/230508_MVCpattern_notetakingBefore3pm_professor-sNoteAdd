// 다른 곳에서 부를 때, 가져오기 편하게 여기에 다 모을 것 임 
    const posts = require("./posts")
        // posts.js 에서 포스트 객체를 post 내보냈어. 그걸 가져오는 거야 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
    console.log(posts)

    const user = require("./users");


// 다 받고, 한번에 내보내기 
    module.exports = {posts, user};
        // 객체 안에 담아서 내보낸다. 