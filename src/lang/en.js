require('dotenv').config();
module.exports = {
    code: "vi",
    title: `Chào mừng đến với trang của tôi ${process.env.APP_NAME}`,
    greeting: `<p><span class="primary-site"></span> <a class="link-site primary-site"></a> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
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