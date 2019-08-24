// create checklist collection

conn = new Mongo()
db = conn.getDB('egg-test-db')

db.checklists.insertMany([
    {
        type: 'sql',
        methods: [
            "了解项目持久层框架及相关函数，明确所有sql语句拼接的用法",
            "列举所有存在参数拼接的sql语句",
            "逐一反推上步中的拼接语句在代码中的调用情况：是否由接口层传入、参数传递过程中的处理"
        ],
        results: [
            "传入SQL的外部入参全部经过预编译处理",
            "未经预编译的参数必须做出严格的过滤。推荐白名单方式，如仅允许数字字符。如果是黑名单方式需要视具体情况判断"
        ]
    },
    {
        type: "store-xss",
        methods: [
            "列举所有用户输入跨请求返回前端的场景",
            "测试每个场景的服务端处理和输出点。确保无法插入DOM中",
            "确认服务端是否存在全局的XSS过滤，梳理过滤遗漏以及防御失效的场景",
            "对于Ajax接口，需要了解前端js框架中拼接写入DOM的方式。排查这些函数以及JS原生写入DOM函数的使用。排查是否用户可控"
        ],
        results: [
            "外部参数输出到HTML标签间，需HTML实体转义（左右尖括号）。以避免插入标签",
            "左右尖括号和“&”符号）；以避免闭合属性及标签。",
            "避免用户输入插入到ON事件内",
            "外部参数插入到链接属性中，需要确保前置协议不可控。 输出到链接参数部分的内容需要经过URL编码。",
            "外部参数插入到CSS中，需要进行CSS Hex编码",
            "外部参数插入到javascript中，应只能插入到变量值中，即引号内。并需要做javascript转义",
        ]
    },
    {
        type: "dom-xss",
        methods: [
            "需要了解前端js框架中拼接写入DOM的方式。",
            "正向排查法：检索前端代码中所有输入点函数，并跟踪其值的处理，确认其是否写入DOM",
            "反向排查法：检索前端代码所有dom输出函数，并反推其是否外部可控。",
        ],
        results: [
            "前端代码未将外部参数直接写入DOM。",
            "如写入DOM，则必须进行过滤",
        ],
        comments: `常见输入函数：Location.search、location.hash、inputs、document.cookie、document.referer、localstorage等原生函数；前端框架自带相关函数。常见输出函数：页面跳转类location.href、location.replace、location.assign；取值类：innerHTML、document.write、document.writeln、evel、jquery HTML()。前端框架相关函数，比如react的dangerouslySetInnerHTML`
    },
    {
        type: 'file-upload',
        methods: [
            "文件后缀是否外部可控。",
            "如果外部可控则判断前置目录设置是否合理，是否可执行目录。用户可控部分是否对\"../ \"或着\"..\\\"（windows）做相应的检测处理。是否对读取文件后缀进行控制。",
            "尝试跨目录上传是否可以成功",
            "测试服务器后台是否对文件类型做限制",
        ],
        results: [
            "文件上传无目录穿越问题",
            "文件不能上传到可执行目录",
            "限制文件后缀不能是该开发语言可执行文件，如.php  .jsp .jspx   .js 等",
        ]
    },
    {
        type: 'path-traverse',
        methods: [
            "列举代码中所有读文件的操作，跟踪调用逻辑。排查路径及文件名是否外部可控。",
            "如果外部可控则判断前置目录设置是否合理，用户可控部分是否对'../ '或着'..\\'（windows）做相应的检测处理。是否对读取文件后缀进行控制。",
            "列举页面所有文件下载操作，尝试通过目录穿越读取etc/passwd。如“../../../../../../../../../../../etc/passwd”或着“/../../../../../../../../../etc/passwd”",
            "根据业务需要测试是否对下载文件后缀做相应的限制。",
        ],
        results: [
            "只能下载固定目录下的固定类型文件",
            "且文件目录设置合理，非可执行目录，文件夹中没有业务无关的敏感信息"
        ],
        comments: `常见读文件函数（仅底层函数，包括但不限于）：
                PHP    危险函数fread(), readfile(), file_get_content()
                python危险函数read(), readline(), readlines()
                Node.js危险函数read(), readFile(), readFileSync()
                JAVA   危险函数read()，readLine()`
    },
    {
        type: 'xxe',
        methods: [
            "列举代码中所有XML解析函数",
            "查看XML解析器初始化的时候是否关闭实体的解析",
            "如未关闭外部实体的解析，跟踪其调用确定XML是否外部可传入",
        ],
        results: [
            "XML解析器关闭实体解析"
        ]
    },
    {
        type: 'ssrf',
        methods: [
            "列举代码中所有网络请求函数",
            "查看网络请求地址是否可控，是否有做目标地址的限制",
        ],
        results: [
            "服务端不会访问外部制定的地址，或者在业务需要的情况下最小范围内访问外部制定的地址"
        ]
    },
    {
        type: 'cmdinject',
        methods: [
            "熟悉系统语言框架中所涉及的操作系统操作函数。",
            "列举系统代码中所有执行OS操作的函数，判断参数是否外部可控。",
            "跟踪参数传递流程，判断是否对“&”等操作系统隔断符做有效处理。系统设定的操作系统命令部分是否合理，是否可以有效隔断系统设定的OS命令语法",
        ],
        results: [
            "尽量避免用户输入拼接到OS命令使用",
            "外部用户输入拼接到OS命令前，需进行黑名单/或白名单处理，保证用户输入无法造成危害。",
        ]
    },
    {
        type: 'csrf',
        methods: [
            "系统身份凭证是否存在于COOKIE",
            "梳理系统代码调用流程，分析系统是否存在CSRF防御机制",
            "分析CSRF防御机制是否覆盖所有“重要”操作",
            "如果CSRF防御机制为校验referer，需要禁止referer为空的请求访问",
            "系统身份凭证是否存在于COOKIE",
            "分析系统重要操作是否存在csrf token限制",
            "分析系统重要操作是否校验referer",
        ],
        results: [
            "系统重要操作请求无法构造",
            "系统重要操作均校验referer为本域内或者不能为空。",
            "系统重要操作请求无法构造",
            "系统重要操作均校验referer为本域内或者不能为空。",
        ]
    },
    {
        type: 'urljump',
        methods: [
            "如存在前端JS读取用户输入并拼接到URL地址中执行跳转的场景，需检查程序是否对用户输入做限制和检查",
            "如存在服务端将用户输入拼接到URL地址中并通过302（location头），使浏览器地址跳转的场景，需检查程序是否对用户输入做限制和检查",
        ],
        results: [
            "尽量避免根据用户输入拼接到URL地址中",
            "域名均不能被外界完全控制。",
        ]
    }

])