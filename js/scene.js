//变量定义
let W = window.innerWidth;
let H = window.innerHeight;
let flagLoad = false;
let interval_load = '';
let object = '';
let scene, camera, renderer, light, controls;
let clock = new THREE.Clock();
let container = '';
let building = "";
let flagAlpha = false;
let textureCube = "";

let activeFire;
let fireArray = [];

//场景
function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");
}

//相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(
        70,
        W / H,
        0.000001,
        1000000
    );
    camera.position.set(45, 18, 1);
    camera.lookAt(0, 0, 0);
}

//画布
function initRenderer() {
    container = document.getElementById('div_canvas');
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        logarithmicDepthBuffer: true,
        // alpha: true
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // renderer.shadowMap.enabled = true; //渲染器渲染投影
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap; //点

    // renderer.physicallyCorrectLights = true;
    // renderer.outputEncoding = THREE.sRGBEncoding;

    // renderer.toneMapping = THREE.ReinhardToneMapping;
    // renderer.toneMappingExposure = 5;
}

//光线
function initLight() {
    let aLight = new THREE.AmbientLight(0xFFFFFF);
    scene.add(aLight.clone());

    dLight = new THREE.DirectionalLight(0xFFFFFF,.5);
    dLight.position.set(300, 500, -300);
    scene.add(dLight.clone());
}

// 控制器
function initControls() {
    controls = new THREE.OrbitControls(camera, container);
    // controls = new THREE.FirstPersonControls(camera, container);
    //controls.maxPolarAngle = Math.PI * .45;
    controls.enableDamping = true;
    controls.dampingFactor = 0.4;
    controls.enableZoom = true;
    controls.minDistance = 0.0001;
    controls.maxDistance = 10000000;

    
    // controls.lookSpeed = 1; //鼠标移动查看的速度
    // controls.movementSpeed = 20; //相机移动速度
    // controls.noFly = true;
    // controls.constrainVertical = true; //约束垂直
    // controls.verticalMin = 1.0;
    // controls.verticalMax = 2.0;
    // controls.lon = -100; //进入初始视角x轴的角度
    // controls.lat = 0; //初始视角进入后y轴的角度

    controls.listenToKeyEvents(document);
}

// 渲染
function render() {

    controls.update();

    renderer.render(scene, camera);

    console.log(camera.position)

    requestAnimationFrame(render);
}



// 界面尺寸变更
function onWindowResize() {
    W = window.innerWidth;
    H = window.innerHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
}
