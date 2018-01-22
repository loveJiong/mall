import Mock from 'mockjs'

Mock.mock('/api/mineCompanyList', (req, res) => {
    return [
            {
                name: '中汇文具',
                mobile: '+34 918936681',
                description: '描述描述都是描述描述描述都是描述描述描述都是描述描述描述都是描述描述描述都是描述描述描述都是描述描述描述都是描述描述描述都是描述描述描述都是描述描述描述都是描述描述描述都是描述描述描述都是描述',
                icon: require('../static/img/company1.png')
            },
            {
                name: '国贸城集团',
                mobile: '+34 918936681',
                description: '描述描述都是描述描述描述都是描述描述描述都是描述描述描述都是描述描述描述都是描述描述描述都是描述',
                icon: require('../static/img/company2.png')
            }
        ]
})
