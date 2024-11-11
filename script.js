// Initialize the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Create the globe (a sphere)
var geometry = new THREE.SphereGeometry(5, 50, 50);
var material = new THREE.MeshBasicMaterial({
    color: 0x87CEEB, // Earth color (blue)
    wireframe: true
});
var globe = new THREE.Mesh(geometry, material);
scene.add(globe);

camera.position.z = 15; // Set camera position

// Enable controls for rotating the globe
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; // Disable zooming

// Function to load the texture of the Earth
function loadTexture() {
    var loader = new THREE.TextureLoader();
    loader.load('https://raw.githubusercontent.com/Arctia/planet-3d/master/maps/earthmap1k.jpg', function(texture) {
        globe.material.map = texture;
        globe.material.needsUpdate = true;
    });
}
loadTexture();

// Event listener for clicking on the globe to get location
globe.addEventListener('click', function(event) {
    var mouse = new THREE.Vector2();
    var raycaster = new THREE.Raycaster();
    
    // Convert mouse position to normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.updateMatrixWorld();
    raycaster.setFromCamera(mouse, camera);
    
    var intersects = raycaster.intersectObject(globe);
    if (intersects.length > 0) {
        var point = intersects[0].point;
        showLocationInfo(point);
    }
});

// Function to display location info in the popup
function showLocationInfo(point) {
    var locationData = {
        name: 'Example Location',
        image: 'https://via.placeholder.com/200', // Replace with actual location image
        description: 'Global warming effects: Rising sea levels, heat waves, etc.'
    };
    
    document.getElementById('location-name').textContent = locationData.name;
    document.getElementById('location-image').src = locationData.image;
    document.getElementById('description').textContent = locationData.description;
    
    document.getElementById('popup').style.display = 'block'; // Show the popup
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none'; // Hide the popup
}

// Animation loop to keep rendering the globe
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
