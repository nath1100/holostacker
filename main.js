import Game from "./game.js";

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
.add("img/sheets/sheet.json")
.load((loader, resources) => {
        // Aliases
        let sheet = app.loader.resources["img/sheets/sheet.json"].spritesheet;

        const title = new PIXI.Sprite(sheet.textures["title.png"]);
        
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

            // Add title disappearance animation to ticker         
            app.ticker.add(scaleTitle);
            
            function scaleTitle(delta) {
                title.scale.x += 0.02;
                title.scale.y += 0.02;
                title.alpha -= 0.02;
                
                // Set title to invisible and remove listener when finished disappearing
                if (title.alpha <= -0.5) {
                    title.visible = false;
                    app.ticker.remove(scaleTitle);
                }
            }

            // app.ticker.add((delta) => {
            //     title.scale.x += 0.02;
            //     title.scale.y += 0.02;
            //     title.alpha -= 0.02;
            //     if (title.alpha <= -0.5) {
            //         //title.visible = false;
            //         app.ticker.stop();
            //     }
            // });


            // Trigger menu enable
            enableMenu();
        }

        // Title scales up when pointer hovers over
        function titleOnFocus() {
            title.scale.set(1.25);
        }
        function titleOnUnfocus() {
            title.scale.set(1);
        }

        // Create menu container
        const menu = new PIXI.Container();

        app.stage.addChild(menu);

        // Add menu items to container
        const sprint_button = new PIXI.Sprite(sheet.textures["sprint_off.png"]);
        const settings_button = new PIXI.Sprite(sheet.textures["settings_off.png"]);

        // Set menu button positions
        sprint_button.position.set(0, 0);
        sprint_button.anchor.set(0.5);
        settings_button.position.set(0, sprint_button.height + 20);
        settings_button.anchor.set(0.5);

        // Set interaction options
        sprint_button
            .on("mouseover", () => {sprint_button.texture = sheet.textures["sprint_on.png"]})
            .on("mouseout", () => {sprint_button.texture = sheet.textures["sprint_off.png"]});

        settings_button
            .on("mouseover", () => {settings_button.texture = sheet.textures["settings_on.png"]})
            .on("mouseout", () => {settings_button.texture = sheet.textures["settings_off.png"]});

        // Add menu children
        menu
        .addChild(
            sprint_button,
            settings_button
        );
        
        // Set initial position (off-screen + buffer) and properties of menu container
        menu.position.set(app.screen.width + menu.width + 50, app.screen.height / 2);
        menu.alpha = 0;
        menu.anchor = 0.5;
        
        function enableMenu() {
            // Slide menu into view whilst increasing visibility
            app.ticker.add(menuIn);
            
            // Animation for opening main menu
            function menuIn(delta) {
                menu.alpha += 0.5;
                menu.x -= 40;
                // If menu reaches centre, stop moving
                if (menu.x - 40 <= app.screen.width / 2) {
                    menu.x = app.screen.width / 2;
                    // Set alpha to 1 if not already
                    menu.alpha = 1;
                    
                    // Enable menu interactivity
                    for (var item of menu.children) {
                        item.interactive = true;
                        item.buttonMode = true;
                    }

                    // Remove this listener from the ticker
                    app.ticker.remove(menuIn);
                }
            }
        }

    });
