require('dotenv').config();
module.exports = {
    code: "vi",
    title: `Chào mừng đến với trang của tôi ${process.env.APP_NAME}`,
    greeting: `Xin chào thế giới! ${process.env.APP_NAME}`,
    menus: [
        {
            name: "Trang Chủ",
            url: "index.html"
        },
        {
            name: "Về chúng tôi",
            url: "about.html",
            children: [
                {
                    "name": "Submenu 1",
                    "url": "team.html"
                }
            ]
        }
    ],
    sliderItems: [
        {
            src: "https://s1.vnecdn.net/vnexpress/restruct/i/v9519/v2_2019/pc/graphics/logo.svg",
            alt: "Slide 1",
            title: "Đây là Slide 1",
            description: "Đây là 1"
        },
        {
            src: "https://s1.vnecdn.net/vnexpress/restruct/i/v9519/v2_2019/pc/graphics/logo.svg",
            alt: "Slide 2",
            title: "Đây là Slide 2",
            description: "Đây là 2"
        }
    ]
}