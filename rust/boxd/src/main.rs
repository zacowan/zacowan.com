use bevy::prelude::*;
use bevy::render::camera::ClearColorConfig;
use rand::Rng;

// Game states
#[derive(States, Debug, Clone, Eq, PartialEq, Hash, Default)]
enum GameState {
    #[default]
    Startup,
    Countdown,
    Playing,
    Victory,
}

// Resources
#[derive(Resource, Deref, DerefMut)]
struct CountdownTimer(Timer);

#[derive(Component)]
struct StartButton;

#[derive(Component)]
struct CountdownText;

#[derive(Component)]
struct ClickBox;

#[derive(Component)]
struct MenuButton;

#[derive(Component)]
struct PlayAgainButton;

#[derive(Resource, Default)]
struct OutlineEntity(Option<Entity>);

#[derive(Resource)]
struct GameTimer {
    start_time: f32,
    completion_time: Option<f32>,
}

impl Default for GameTimer {
    fn default() -> Self {
        Self {
            start_time: 0.0,
            completion_time: None,
        }
    }
}

const BACKGROUND_COLOR: Color = Color::BLACK;
const OUTLINE_COLOR: Color = Color::WHITE;
const BOX_SIZE: Vec2 = Vec2::new(80.0, 80.0);

fn main() {
    App::new()
        .add_plugins(DefaultPlugins.set(WindowPlugin {
            primary_window: Some(Window {
                title: "Boxd".to_string(),
                resolution: (800.0, 600.0).into(),
                ..default()
            }),
            ..default()
        }))
        .init_state::<GameState>()
        // Global setup
        .add_systems(Startup, setup_camera)
        // Startup UI
        .add_systems(OnEnter(GameState::Startup), spawn_startup_ui)
        .add_systems(
            Update,
            handle_start_button.run_if(in_state(GameState::Startup)),
        )
        .add_systems(OnExit(GameState::Startup), despawn_all_ui)
        // Countdown
        .add_systems(OnEnter(GameState::Countdown), start_countdown)
        .add_systems(
            Update,
            tick_countdown_and_show.run_if(in_state(GameState::Countdown)),
        )
        .add_systems(OnExit(GameState::Countdown), despawn_all_ui)
        // Playing
        .add_systems(OnEnter(GameState::Playing), setup_playing)
        .add_systems(Update, handle_clicks.run_if(in_state(GameState::Playing)))
        .add_systems(OnExit(GameState::Playing), cleanup_playing)
        // Victory screen
        .add_systems(OnEnter(GameState::Victory), setup_victory_screen)
        .add_systems(
            Update,
            handle_victory_buttons.run_if(in_state(GameState::Victory)),
        )
        .add_systems(OnExit(GameState::Victory), despawn_all_ui)
        .run();
}

fn setup_camera(mut commands: Commands) {
    commands.spawn((
        Camera2d::default(),
        Camera {
            clear_color: ClearColorConfig::Custom(BACKGROUND_COLOR),
            ..default()
        },
    ));
}

fn spawn_startup_ui(mut commands: Commands) {
    commands
        .spawn(Node {
            width: Val::Percent(100.0),
            height: Val::Percent(100.0),
            justify_content: JustifyContent::Center,
            align_items: AlignItems::Center,
            flex_direction: FlexDirection::Column,
            row_gap: Val::Px(30.0),
            ..default()
        })
        .with_children(|parent| {
            // Title
            parent.spawn((
                Text::new("Boxd"),
                TextFont {
                    font_size: 64.0,
                    ..default()
                },
                TextColor(OUTLINE_COLOR),
            ));

            // Start button
            parent
                .spawn((
                    Button,
                    Node {
                        padding: UiRect::all(Val::Px(16.0)),
                        border: UiRect::all(Val::Px(2.0)),
                        ..default()
                    },
                    BorderColor(OUTLINE_COLOR),
                    BackgroundColor(Color::BLACK),
                    StartButton,
                ))
                .with_children(|button| {
                    button.spawn((
                        Text::new("Start"),
                        TextFont {
                            font_size: 28.0,
                            ..default()
                        },
                        TextColor(OUTLINE_COLOR),
                    ));
                });
        });
}

fn handle_start_button(
    mut interaction_query: Query<
        (&Interaction, &mut BackgroundColor),
        (Changed<Interaction>, With<StartButton>),
    >,
    mut next_state: ResMut<NextState<GameState>>,
) {
    for (interaction, mut bg) in &mut interaction_query {
        match *interaction {
            Interaction::Pressed => {
                *bg = BackgroundColor(Color::srgb(0.2, 0.2, 0.2));
                next_state.set(GameState::Countdown);
            }
            Interaction::Hovered => {
                *bg = BackgroundColor(Color::srgb(0.35, 0.35, 0.35));
            }
            Interaction::None => {
                *bg = BackgroundColor(Color::BLACK);
            }
        }
    }
}

fn start_countdown(mut commands: Commands) {
    commands.insert_resource(CountdownTimer(Timer::from_seconds(3.0, TimerMode::Once)));

    commands
        .spawn(Node {
            width: Val::Percent(100.0),
            height: Val::Percent(100.0),
            justify_content: JustifyContent::Center,
            align_items: AlignItems::Center,
            ..default()
        })
        .with_children(|parent| {
            parent.spawn((
                Text::new("3"),
                TextFont {
                    font_size: 96.0,
                    ..default()
                },
                TextColor(OUTLINE_COLOR),
                CountdownText,
            ));
        });
}

fn tick_countdown_and_show(
    time: Res<Time>,
    mut timer: ResMut<CountdownTimer>,
    mut text_query: Query<&mut Text, With<CountdownText>>,
    mut next_state: ResMut<NextState<GameState>>,
) {
    timer.tick(time.delta());

    let remaining = timer.remaining_secs().ceil() as i32;
    if let Ok(mut text) = text_query.single_mut() {
        **text = remaining.max(0).to_string();
    }

    if timer.finished() {
        next_state.set(GameState::Playing);
    }
}

fn setup_playing(mut commands: Commands, windows: Query<&Window>, time: Res<Time>) {
    let Ok(window) = windows.single() else {
        return;
    };
    // Random position within window bounds, centered coordinates
    let mut rng = rand::thread_rng();
    let x = rng.gen_range(
        -(window.width() / 2.0 - BOX_SIZE.x / 2.0)..(window.width() / 2.0 - BOX_SIZE.x / 2.0),
    );
    let y = rng.gen_range(
        -(window.height() / 2.0 - BOX_SIZE.y / 2.0)..(window.height() / 2.0 - BOX_SIZE.y / 2.0),
    );

    // Use a Sprite with a white border effect via a second entity (outline)
    let fill_color = Color::BLACK;

    // Outline (slightly larger)
    let outline_entity = commands
        .spawn((
            Sprite {
                color: OUTLINE_COLOR,
                custom_size: Some(BOX_SIZE + Vec2::splat(6.0)),
                ..default()
            },
            Transform::from_translation(Vec3::new(x, y, 0.0)),
        ))
        .id();

    // Fill
    commands.spawn((
        Sprite {
            color: fill_color,
            custom_size: Some(BOX_SIZE),
            ..default()
        },
        Transform::from_translation(Vec3::new(x, y, 1.0)),
        ClickBox,
    ));

    commands.insert_resource(OutlineEntity(Some(outline_entity)));
    commands.insert_resource(GameTimer {
        start_time: time.elapsed_secs(),
        completion_time: None,
    });
}

fn handle_clicks(
    buttons: Res<ButtonInput<MouseButton>>,
    windows: Query<&Window>,
    box_query: Query<(&GlobalTransform, &Sprite), With<ClickBox>>,
    mut next_state: ResMut<NextState<GameState>>,
    mut game_timer: ResMut<GameTimer>,
    time: Res<Time>,
) {
    if !buttons.just_pressed(MouseButton::Left) {
        return;
    }

    let Ok(window) = windows.single() else {
        return;
    };
    if let Some(cursor_pos) = window.cursor_position() {
        // Convert cursor position from UI coordinates (top-left origin) to world coordinates (center origin)
        let cursor_centered = Vec2::new(
            cursor_pos.x - window.width() / 2.0,
            -(cursor_pos.y - window.height() / 2.0), // Flip Y axis
        );

        if let Ok((transform, sprite)) = box_query.single() {
            if let Some(size) = sprite.custom_size {
                let half_size = size / 2.0;
                let box_pos = transform.translation().truncate();
                let min = box_pos - half_size;
                let max = box_pos + half_size;

                if cursor_centered.x >= min.x
                    && cursor_centered.x <= max.x
                    && cursor_centered.y >= min.y
                    && cursor_centered.y <= max.y
                {
                    // Record completion time
                    let completion_time = (time.elapsed_secs() - game_timer.start_time) * 1000.0; // Convert to milliseconds
                    game_timer.completion_time = Some(completion_time);

                    // Don't despawn here - let the cleanup system handle it
                    next_state.set(GameState::Victory);
                }
            }
        }
    }
}

fn cleanup_playing(
    mut commands: Commands,
    mut outline_res: ResMut<OutlineEntity>,
    boxes: Query<Entity, With<ClickBox>>,
) {
    for entity in &boxes {
        // Check if entity exists before trying to despawn
        if let Ok(mut entity_commands) = commands.get_entity(entity) {
            entity_commands.despawn();
        }
    }
    if let Some(outline_entity) = outline_res.0.take() {
        // Check if outline entity exists before trying to despawn
        if let Ok(mut entity_commands) = commands.get_entity(outline_entity) {
            entity_commands.despawn();
        }
    }
}

fn setup_victory_screen(mut commands: Commands, game_timer: Res<GameTimer>) {
    let completion_time = game_timer.completion_time.unwrap_or(0.0);
    let time_text = format!("{}ms", completion_time as u32);

    commands
        .spawn(Node {
            width: Val::Percent(100.0),
            height: Val::Percent(100.0),
            justify_content: JustifyContent::Center,
            align_items: AlignItems::Center,
            flex_direction: FlexDirection::Column,
            row_gap: Val::Px(30.0),
            ..default()
        })
        .with_children(|parent| {
            // Victory text
            parent.spawn((
                Text::new("Victory!"),
                TextFont {
                    font_size: 64.0,
                    ..default()
                },
                TextColor(OUTLINE_COLOR),
            ));

            // Time display
            parent.spawn((
                Text::new(time_text),
                TextFont {
                    font_size: 48.0,
                    ..default()
                },
                TextColor(OUTLINE_COLOR),
            ));

            // Button container
            parent
                .spawn(Node {
                    flex_direction: FlexDirection::Row,
                    column_gap: Val::Px(40.0),
                    ..default()
                })
                .with_children(|buttons| {
                    // Menu button
                    buttons
                        .spawn((
                            Button,
                            Node {
                                padding: UiRect::all(Val::Px(16.0)),
                                border: UiRect::all(Val::Px(2.0)),
                                ..default()
                            },
                            BorderColor(OUTLINE_COLOR),
                            BackgroundColor(Color::BLACK),
                            MenuButton,
                        ))
                        .with_children(|button| {
                            button.spawn((
                                Text::new("Menu"),
                                TextFont {
                                    font_size: 28.0,
                                    ..default()
                                },
                                TextColor(OUTLINE_COLOR),
                            ));
                        });

                    // Play Again button
                    buttons
                        .spawn((
                            Button,
                            Node {
                                padding: UiRect::all(Val::Px(16.0)),
                                border: UiRect::all(Val::Px(2.0)),
                                ..default()
                            },
                            BorderColor(OUTLINE_COLOR),
                            BackgroundColor(Color::BLACK),
                            PlayAgainButton,
                        ))
                        .with_children(|button| {
                            button.spawn((
                                Text::new("Play Again"),
                                TextFont {
                                    font_size: 28.0,
                                    ..default()
                                },
                                TextColor(OUTLINE_COLOR),
                            ));
                        });
                });
        });
}

fn handle_victory_buttons(
    mut interaction_query: Query<
        (&Interaction, &mut BackgroundColor),
        (
            Changed<Interaction>,
            Or<(With<MenuButton>, With<PlayAgainButton>)>,
        ),
    >,
    menu_query: Query<&Interaction, (Changed<Interaction>, With<MenuButton>)>,
    play_again_query: Query<&Interaction, (Changed<Interaction>, With<PlayAgainButton>)>,
    mut next_state: ResMut<NextState<GameState>>,
) {
    // Handle button styling
    for (interaction, mut bg) in &mut interaction_query {
        match *interaction {
            Interaction::Pressed => {
                *bg = BackgroundColor(Color::srgb(0.2, 0.2, 0.2));
            }
            Interaction::Hovered => {
                *bg = BackgroundColor(Color::srgb(0.35, 0.35, 0.35));
            }
            Interaction::None => {
                *bg = BackgroundColor(Color::BLACK);
            }
        }
    }

    // Handle menu button
    for interaction in &menu_query {
        if *interaction == Interaction::Pressed {
            next_state.set(GameState::Startup);
        }
    }

    // Handle play again button
    for interaction in &play_again_query {
        if *interaction == Interaction::Pressed {
            next_state.set(GameState::Countdown);
        }
    }
}

fn despawn_all_ui(mut commands: Commands, ui_roots: Query<Entity, With<Node>>) {
    for entity in &ui_roots {
        // Check if entity exists before trying to despawn
        if let Ok(mut entity_commands) = commands.get_entity(entity) {
            entity_commands.despawn();
        }
    }
}
