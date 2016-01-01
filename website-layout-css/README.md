## [一栏布局]()


## [两栏布局]()


## [三栏布局]()

左右固定宽度，中栏自适应宽度的三栏布局的一种实现：

将左栏和右栏的位置设置为absolute，中栏通过设置margin值确定位置。

    .left {
        width: 200px;
        height: 500px;
        position: absolute;
        left: 0;
        top: 0;
    }
    .middle {
        height: 500px;
        margin: 0 310px 0 210px;
    }
    .right {
        width: 300px;
        height: 500px;
        position: absolute;
        right: 0;
        top: 0;
    }

## [混合布局]()