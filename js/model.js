let setting = {
    color: "#ffffff",
    size: 100
};

let data = [];
let xhr = "";
let reader = "";

// 执行
function init() {
    initScene();
    initData();

    //加载成功渲染
    interval_load = setInterval(() => {
        if (flagLoad) {
            clearInterval(interval_load);


            initCamera();
            initLight();
            initRenderer();
            initControls();
            render();
           // animate();

            initEvent();

            window.addEventListener('resize', onWindowResize, false);
        }
    }, 500);
}
init();

//注册事件
function initEvent() {
    //按钮点击
    $('#btn_pcd1').on('click', e => {
        if (object) {
            destroyObject(object);
        }
        loadModel(data[0]);
    });

    $('#btn_pcd2').on('click', e => {
        if (object) {
            destroyObject(object);
        }
        loadModel(data[1]);
    });

    $('#btn_pcd3').on('click', e => {
        if (object) {
            destroyObject(object);
        }
        loadModel(data[2]);
    });
}

// 加载数据
function initData() {
    data = [{
        url: "./models/gulou.pcd",
        isRotate: true,
    }, {
        url: "./models/Zaghetto.pcd",
        isRotate: true,
        },
    {
        url: "./models/rabbit.pcd",
        isRotate: false,
    }];

    //先加载第三个小兔子
    loadModel(data[2]);

    flagLoad = true;
}

//上传PCD文件
function upladFile() {
    if (object) {
        destroyObject(object);
    }

    //加载文件
    let fileObj = document.getElementById("file").files[0];
    reader = new FileReader();
    reader.onload = () => {
        let data = {};
        data.url = reader.result;
        loadModel(data);
    };
    reader.readAsDataURL(fileObj);
}

//加载模型
function loadModel(data) {
    const loader = new THREE.PCDLoader();
    loader.load(data.url, points => {
        reader = null;

        //延时1秒加载
        setTimeout(() => {
            object = points;
            object.geometry.center();
            if (data.isRotate) {
                object.geometry.rotateX(Math.PI);
            }
            useModel();
        }, 1);
    });
}
  
/**使用模型*/
function useModel() {

    //变色
    object.traverse(child => {
        if (child.isPoints) {
            child.material.color = new THREE.Color(setting.color);
            //object.material.map = getTexture();
        }
    });

    //点云大小
    let size = setting.size;
    object.scale.set(size, size, size);
    scene.add(object);

}
//获取点云材质
function getTexture(){
    var texture = new THREE.TextureLoader().load("../texture/sprite-sheet.png");
    return texture;
}
//删除模型
function destroyObject(object) {
    if (!object) return;
    object.traverse(item => {
        if (item.isMesh) {
            item.geometry.dispose(); //删除几何体
            if (item.material.map) item.material.map.dispose();
            item.material.dispose(); //删除材质
        }
    });

    scene.remove(object);
}
