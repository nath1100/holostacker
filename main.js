let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}

PIXI.utils.sayHello(type);

// Create pixi application
const app = new PIXI.Application({
    width: 1280,
    height: 720,
    antialias: true,
    transparent: false,
    resolution: 1
});

// Set canvas dimensions to entire screen
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

// Automatically resize canvas when window is resized
window.addEventListener("resize", resizeWindow);

function resizeWindow() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
}

// Add generated canvas to HTML doc
document.body.appendChild(app.view);

// Load title image and then add it to stage
app.loader
    .add("title", "img/title.png")
    .load((loader, resources) => {
        const title = new PIXI.Sprite(resources.title.texture);
        
        // Set anchor point and centre title image
        title.anchor.set(0.5);
        title.x = app.screen.width / 2;
        title.y = app.screen.height / 2;

        // Set interactivity of title
        title.interactive = true;
        title.buttonMode = true;

        title
            .on("pointerdown", titleOnClick)
            .on("mouseover", titleOnFocus)
            .on("mouseout", titleOnUnfocus);

        app.stage.addChild(title);

        // Animate title image
        app.ticker.add((delta) => {
            title.rotation += 0.01 * delta;
        });

        // Title image scales and disappears when clicked
        function titleOnClick() {
            // Remove interactivity
            title.interactive = false;

            // Scaling ticker
            app.ticker.add((delta) => {
                title.scale.x += 0.02;
                title.scale.y += 0.02;
                title.alpha -= 0.02;
                if (title.alpha <= -0.5) {
                    title.visible = false;
                    app.ticker.remove();
                }
            });
        }

        // Title scales up when pointer hovers over
        function titleOnFocus() {
            title.scale.set(1.25);
        }
        function titleOnUnfocus() {
            title.scale.set(1);
        }


    })
    // Load menu screen
    .load((loader, resources) => {
        
    });
