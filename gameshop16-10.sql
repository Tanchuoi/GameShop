-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2024 at 04:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gameshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `create_at`, `user_id`) VALUES
(24, '2024-11-15 15:19:41', 61),
(25, '2024-11-15 15:23:32', 62),
(27, '2024-11-16 14:13:49', 64),
(28, '2024-11-16 14:18:45', 65);

-- --------------------------------------------------------

--
-- Table structure for table `cart_game`
--

CREATE TABLE `cart_game` (
  `cart_id` bigint(20) UNSIGNED NOT NULL,
  `game_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_game`
--

INSERT INTO `cart_game` (`cart_id`, `game_id`, `quantity`, `added_at`) VALUES
(24, 124, 1, '2024-11-16 14:00:37'),
(27, 124, 3, '2024-11-16 14:14:08'),
(24, 125, 3, '2024-11-16 14:00:37'),
(27, 125, 1, '2024-11-16 14:14:06'),
(24, 126, 1, '2024-11-16 14:00:37');

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` float(8,2) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `platform` varchar(100) NOT NULL,
  `developer` varchar(100) NOT NULL,
  `publisher` varchar(100) NOT NULL,
  `release_day` date NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`id`, `name`, `price`, `description`, `platform`, `developer`, `publisher`, `release_day`, `stock`) VALUES
(124, 'Cyberpunk 2076', 59.99, 'Cyberpunk 2077 is a continuation of the events of Cyberpunk 2020, taking an alternate path to that of Cyberpunk V3.0. The game is set in the dystopian metropolis of Night City. It is set in the Free State of Northern California. Night City is located soutCyberpunk 2077 is a continuation of the events of Cyberpunk 2020, taking an alternate path to that of Cyberpunk V3.0. The game is set in the dystopian metropolis of Night City. It is set in the Free State of Northern California. Night City is located soutCyberpunk 2077 is a continuation of the events of Cyberpunk 2020, taking an alternate path to that of Cyberpunk V3.0. The game is set in the dystopian metropolis of Night City. It is set in the Free State of Northern California. Night City is located sout', 'Playstation 5, PC, Xbox Series S/X, Playstation 5, Xbox One', 'CD PROJECT RED, CD PROJECT', 'CD PROJECT RED', '2015-05-25', 12344),
(125, 'Battlefield V', 29.99, 'The Battlefield series goes back to its roots in a never-before-seen portrayal of World War 2. Take on physical, all-out multiplayer with your squad in modes like the vast Grand Operations and the cooperative Combined Arms, or witness human drama set against global combat in the single player War Stories. As you fight in epic, unexpected locations across the globe, enjoy the richest and most immersive Battlefield yet.', 'Playstation 4, PC, Xbox Series S/X, Xbox One', 'EA Digital Illusions CE', 'Electronic Arts', '2020-05-19', 88124),
(126, 'Life is Strange', 2.99, 'Life Is Strange is a five-part episodic game that sets out to revolutionize story-based choice and consequence games by allowing the player to rewind time and affect the past, present, and future. You are Max, a photography senior who saves her old friend Chloe by discovering she can rewind time. The pair soon find themselves exposed to the darker side of Arcadia Bay as they uncover the disturbing truth behind the sudden disappearance of a fellow student. Meanwhile, Max begins to have premonitions as she struggles to understand the implications of her power. She must quickly learn that changing the past can sometimes lead to a devastating future.', 'Playstation 4, PC, Xbox One, Xbox 360, Playstation 3', 'Dontnod Entertainment', 'Square Enix', '2012-10-30', 123121),
(127, 'Mario Kart 8: Deluxe', 8.99, 'Hit the road with the definitive version of Mario Kart 8 and play anytime, anywhere! Race your friends or battle them in a revised battle mode on new and returning battle courses. Play locally in up to 4-player multiplayer in 1080p while playing in TV Mode. Every track from the Wii U version, including DLC, makes a glorious return. Plus, the Inklings appear as all-new guest characters, along with returning favorites, such as King Boo, Dry Bones, and Bowser Jr.!', 'Nintendo Switch', 'Nintendo EAD', 'Nintendo', '2017-04-27', 46341),
(128, 'BioShock Infinite', 18.99, 'This first-person story-driven shooter and entry in the Bioshock franchise follows Booker DeWitt as he enters the floating independent (formerly US) city of Columbia in 1912 and attempts to retrieve a girl trapped in a tower by the citys self-proclaimed despot/prophet in order to erase his financial debt. Throughout the story, themes of violence, racism and fatalism are brought up. Viewer & User Discretion is advised.\r\n\r\n', 'Xbox One, PlayStation 4, Linux, Xbox 360, PC, Nintendo Switch, PlayStation 3', 'Irrational Games', '2K Games', '2013-02-25', 747454),
(129, 'Anno: 1800', 12.99, 'Anno 1800 takes place in the 19th century at the dawn of the Industrial Age. Like other Anno games, Anno 1800 is a city-building and strategy game. While it is set in the context of colonial trade, the featured architecture is Victorian Era and the economic engine is factory labor. The core gameplay of Anno 1800 takes place in the Old World, where the needs of the citizens, workers and artisans are central to the management of production and supply chains. A parallel New World city exists, which produces products that laborers in the Old World want to purchase, thus trade routes need to be established. Unlike its colonial 18th century predecessor Anno 1701, the game has a blueprint feature that helps the player to plan out the city.', 'PC (Microsoft Windows)', 'Blue Byte', 'Ubisoft', '2019-04-15', 63454),
(130, 'Red Dead Redemption 2', 34.99, 'America, 1899. The end of the Wild West era has begun. After a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.', 'Xbox One, PlayStation 4, PC, Google Stadia', 'Rockstar Studios', 'Rockstar Studios', '2018-10-25', 98794),
(131, 'Horizon Zero Dawn', 29.99, 'Horizon Zero Dawn takes place in the 31st century, in a post-apocalyptic world where colossal machines dominate the land. Human civilization has regressed to tribal societies of hunters and gatherers who survive in immense forests, imposing mountain ranges, and the atmospheric ruins of their ancestors – all while the machines become increasingly powerful. The player controls Aloy, a huntress who uses her speed, cunning, and agility to stay alive and protect herself and others against the force, size, and power of the machines. The game features sci-fi and mythical elements.', 'PlayStation 4, PC', 'Guerrilla Games', 'Sony Interactive Entertainment', '2017-02-27', 45645),
(132, 'Grand Theft Auto: V', 39.99, 'Grand Theft Auto V is a vast open world game set in Los Santos, a sprawling sun-soaked metropolis struggling to stay afloat in an era of economic uncertainty and cheap reality TV. The game blends storytelling and gameplay in new ways as players repeatedly jump in and out of the lives of the games three lead characters, playing all sides of the games interwoven story.', 'Xbox One, PlayStation 4, Xbox 360, PlayStation 5, PC, PlayStation 3, Xbox Series S/X', 'Rockstar North', 'Rockstar Games', '2013-09-16', 35431),
(133, 'The Elder Scrolls: Skyrim', 19.99, 'Two hundred years have passed since the events of The Elder Scrolls IV: Oblivion, and it is now 4E 201. The High King of Skyrim has been killed, and the threat of Civil War looms over the land of Skyrim; One side wishes to secede from the weakened Third Empire, while the other wishes to remain a part of it. To make matters worse, this schism is the final event in a prophecy foretold by the Elder Scrolls that will lead to the return of the dragons under Alduin, the Nordic god of destruction. The player starts the game on a cart heading for the chopping block after being caught with the Stormcloaks in an ambush by the Imperial Legion. As the player lays their head on the chopping block, the dragon Alduin attacks. In the midst of the chaos, Hadvar, several Stormcloaks, along with their leader and fellow prisoner, Ulfric Stormcloak, assist in the players escape. The player may choose between the assistance of Ralof, the Stormcloak who arrived with Ulfric, or Hadvar, the Imperial soldier tasked with reading off the names of the prisoners being sent to their execution. After assisting and gaining the favor of Jarl Balgruuf the Greater, The player later learns that they are Dovahkiin, or Dragonborn, a person charged with the duty of defeating Alduin and the dragons. Eventually, the player meets Delphine, and Esbern, two of the last remaining Blades, and becomes the pupil of the esteemed Greybeards of High Hrothgar.\r\n', 'Xbox 360, PC (Microsoft Windows), PlayStation 3', 'Bethesda Game Studios', 'Bethesda Softworks', '2011-10-09', 34534),
(134, 'Warframe', 14.99, 'Warframe situates players as members of the Tenno race, newly awoken after years of cryo-sleep into a solar system at war. Reborn into a corrupt era, the Tenno are sought by the oppressive Grineer Empire for annihilation. Warframe armor is the key to overthrowing the Grineer by providing players with unique offensive and defensive powers to explore, upgrade and master during purpose-driven radical raids.', 'Xbox One, PlayStation 4, PlayStation 5, PC, Nintendo Switch, Xbox Series S/X', 'Digital Extremes', 'Digital Extremes', '2015-05-27', 23422),
(135, 'Minecraft', 25.99, 'Minecraft focuses on allowing the player to explore, interact with, and modify a dynamically-generated map made of one-cubic-meter-sized blocks. In addition to blocks, the environment features plants, mobs, and items. Some activities in the game include mining for ore, fighting hostile mobs, and crafting new blocks and tools by gathering various resources found in the game. The games open-ended model allows players to create structures, creations, and artwork on various multiplayer servers or their single-player maps. Other features include redstone circuits for logic computations and remote actions, minecarts and tracks, and a mysterious underworld called the Nether. A designated but completely optional goal of the game is to travel to a dimension called the End, and defeat the ender dragon.', 'Android, Linux, Mac, PC', 'Mojang', ' Mojang / Xbox Game Studios / Sony Interactive Entertainment', '2014-02-18', 41241),
(136, 'Rise of the Tomb Raider', 12.99, 'Rise of the Tomb Raider is a third-person action-adventure game in which players control Lara Croft, who is on a quest to discover the legendary city of Kitezh. Combat is a major gameplay mechanic; Lara has a large variety of weapons at her disposal (including assault rifles, shotguns, and pistols), some of which have an alternate firing mode. Players may also utilize stealth to progress through portions of the game, using bows and arrows to take out enemies, creating distractions to draw enemy attention away from Lara, or hiding in bushes to evade enemies. Lara can use the environment to fight enemies, shooting explosive barrels, tearing down rope-wrapped structures with rope arrows, or ambushing enemies from high ground. She can also use her ice axe and combat knife to engage in melee combat with enemies.', 'Xbox One, PlayStation 4, Linux, Xbox 360, Mac, PC, Google Stadia', 'Crystal Dynamics', 'Microsoft Studios / Square Enix Europe', '2015-10-09', 34534),
(137, 'Metro Exodus', 37.99, 'Metro Exodus is an epic, story-driven first person shooter from 4A Games that blends deadly combat and stealth with exploration and survival horror in one of the most immersive game worlds ever created. Explore the Russian wilderness across vast, non-linear levels and follow a thrilling story-line that spans an entire year through spring, summer and autumn to the depths of nuclear winter. Inspired by the novels of Dmitry Glukhovsky, Metro Exodus continues Artyoms story in the greatest Metro adventure yet.', 'Xbox One, PlayStation 4, PlayStation 5, PC, Xbox Series S/X, Google Stadia', '4A Games', 'Deep Silver', '2019-02-14', 85622),
(138, 'Terraria', 14.99, 'Dig, Fight, Explore, Build: The very world is at your fingertips as you fight for survival, fortune, and glory. Will you delve deep into cavernous expanses in search of treasure and raw materials with which to craft ever-evolving gear, machinery, and aesthetics? Perhaps you will choose instead to seek out ever-greater foes to test your mettle in combat? Maybe you will decide to construct your own city to house the host of mysterious allies you may encounter along your travels? In the World of Terraria, the choice is yours!', 'A lot.', 'Re-Logic', '505 Games', '2011-05-15', 23432),
(139, 'Rocket League', 23.99, 'Rocket League is a high-powered hybrid of arcade-style soccer and vehicular mayhem with easy-to-understand controls and fluid, physics-driven competition. Rocket League includes casual and competitive Online Matches, a fully-featured offline Season Mode, special “Mutators” that let you change the rules entirely, hockey and basketball-inspired Extra Modes, and more than 500 trillion possible cosmetic customization combinations.', 'Xbox One, PlayStation 4, Linux, Mac, PlayStation 5, PC, Nintendo Switch, Xbox Series S/X', 'Psyonix', 'Psyonix', '2015-07-06', 35135),
(142, 'The Witcher 3: Wild Hunt', 19.99, 'RPG and sequel to The Witcher 2 (2011), The Witcher 3 follows witcher Geralt of Rivia as he seeks out his former lover and his young subject while intermingling with the political workings of the wartorn Northern Kingdoms. Geralt has to fight monsters and deal with people of all sorts in order to solve complex problems and settle contentious disputes, each ranging from the personal to the world-changing.', 'Xbox One, PlayStation 4, PC, Nintendo Switch', 'CD PROJECT RED', 'CD PROJECT RED', '2015-05-18', 35325),
(143, 'Hitman', 12.99, 'Become the Master Assassin in an intense spy-thriller story. As Agent 47, you perform contract hits on powerful, high-profile targets in exotic locations around the world. Gameplay focuses on taking out targets in huge and intricate sandbox levels with complete freedom of approach. Where to go, when to strike and who to kill – it is all up to you.', 'Xbox One, PlayStation 4, Linux, Mac, PC, Google Stadia', 'IO Interactive', 'Square Enix Europe', '2016-03-10', 52521),
(144, 'Fallout 4', 26.99, 'The story of Fallout 4 focuses on a spouse, the Sole Survivor of Vault 111, as they search for their missing child, Shaun. Fallout 4 is set in and around the Boston area in 2287, 10 years after Fallout 3. Along the way, the Sole Survivor discovers a world in fear of a mysterious organization known as the Institute, consumed by paranoia of a race of robotic yet also biological human-like beings known as synths. As a result of the synth-focused narrative, the Sole Survivor, as well as the player, are faced with ethical questions such as how far people should experiment with science, the morality of creating sentient living machines that express emotions and suffering, and what it means to be human.', 'Xbox One, PlayStation 4, PC', 'Bethesda Game Studios', 'Bethesda Softworks', '2015-10-09', 84221),
(145, 'GTA: San Andreas', 3.99, 'Returning after his mothers murder to the semi-fictional city of Los Santos (based on Los Angeles), Carl Johnson, a former gang banger, must take back the streets for his family and friends by gaining respect and once again gaining control over the streets. However, a story filled with crime, lies and corruption will lead him to trudge the entire state of San Andreas (based on California and Nevada) to rebuild his life.\r\n\r\n', 'Android, PlayStation 4, PlayStation 2, Xbox 360, Xbox, PC, PlayStation 3', 'Rockstar North', 'Rockstar Games', '2004-10-25', 12421),
(146, 'Golf with your Friends', 7.99, 'Golf With Your Friends is an entertaining, challenging, multiplayer mini golf game for up to 12 players. The controls are simple and the game is designed for the user to be able to host or join a game within a few seconds. The game will be hosted on our servers where the user has the ability to add a password if so required or leave it open to the public. Players on PC, have the ability to access the level editor to create your own or test thousands of community made maps.\r\n\r\nGolf with your Friends Website', 'Xbox One, PlayStation 4, Linux, PC, Nintendo Switch, Google Stadia', 'Blacklight Interactive', 'Team17 Digital / Blacklight Interactive', '2016-01-28', 62321),
(147, 'Heavy Rain', 23.99, 'Heavy Rain is a cinematic psychological thriller from game developer Quantic Dream exclusively for the PlayStation 3. Dealing with a range of adult themes, the game revolves around a sophisticated plot and strong narrative threads that explore a complex moral proposition. You assume the role of multiple characters with very different backgrounds, motivations, and skills in a world where each player decision affects what will follow.', 'PlayStation 4, PC, PlayStation 3', 'Quantic Dream', 'Sony Computer Entertainment / Quantic Dream', '2010-02-17', 76554),
(148, 'Dota 2', 12.99, 'Dota 2 is an RTS-styled MOBA-type competitive team game with RPG elements. Two competing teams (Radiant and Dire) consist of five players each. The main objective in Dota 2 is to destroy the enemy Ancient inside their stronghold. These strongholds are protected by multiple towers down 3 lanes. Instead of building armies of units like in classical RTS games, each player controls a single Hero, a strategically-powerful unit with unique abilities and characteristics which can be improved over the course of the game. Experience is earned when nearby creeps and heroes die, and once collecting enough experience, the hero gains a level, which increases the heros stats, and at most levels the hero gains a skill point which can be spent to unlock or upgrade one of the heros abilities. Alongside a heros fixed abilities, each hero has 6 inventory slots which can be filled with Items which provide various benefits and abilities. To purchase these items, Gold is gained passively over time, by killing creeps, by killing enemy heroes and by destroying buildings.\r\n\r\n', 'Linux, Mac, PC', 'Valve', 'Valve', '2013-07-08', 35231),
(149, 'Portal 2', 4.99, 'Sequel to the acclaimed Portal (2007), Portal 2 pits the protagonist of the original game, Chell, and her new robot friend, Wheatley, against more puzzles conceived by GLaDOS, an A.I. with the sole purpose of testing the Portal Guns mechanics and taking revenge on Chell for the events of Portal. As a result of several interactions and revelations, Chell once again pushes to escape Aperture Science Labs.', 'Linux, Xbox 360, Mac, PC, PlayStation 3', 'Valve', 'Valve', '2011-04-18', 26321),
(150, 'Sid Meier\'s Civilization VI', 27.99, 'Civilization is a turn-based strategy game in which you attempt to build an empire to stand the test of time. Become Ruler of the World by establishing and leading a civilization from the Stone Age to the Information Age. Wage war, conduct diplomacy, advance your culture, and go head-to-head with historys greatest leaders as you attempt to build the greatest civilization the world has ever known.', 'Xbox One, PlayStation 4, Linux, Mac, iOS, PC, Nintendo Switch', 'Firaxis Games', '2K Games / Aspyr Media', '2016-10-19', 84562),
(151, 'God of War', 59.99, 'Many years have passed since Kratos took his vengeance against the Olympian gods. Having survived his final encounter with his father Zeus, Kratos has since travelled to Midgard in Ancient Norway and now lives with his young son Atreus in the world of the Norse gods, a savage land inhabited by many ferocious monsters and warriors. In order to teach his son, whose mother (and Kratoss second wife) has recently died, how to survive in such a world, Kratos must master the rage that has driven him for many years and embrace his newfound role as a father and a mentor.\r\n\r\n', 'PlayStation 4, PC', 'Santa Monica Studio', 'Sony Interactive Entertainment', '2018-04-19', 51223),
(152, 'FIFA 22', 15.99, 'Powered by Football, FIFA 22 brings the game even closer to the real thing with fundamental gameplay advances and a new season of innovation across every mode. Play with 17,000+ players, over 700 teams in 90+ stadiums and more than 30 leagues from all over the globe.', 'Xbox One, PlayStation 4, PlayStation 5, PC, Xbox Series S/X, Google Stadia', 'EA Vancouver / EA Romania', 'EA Sports', '2021-09-29', 13141),
(153, 'Half-Life 2', 11.99, '1998. HALF-LIFE sends a shock through the game industry with its combination of pounding action and continuous, immersive storytelling. By taking the suspense, challenge and visceral charge of the original, and adding startling new realism and responsiveness, Half-Life 2 opens the door to a world where the players presence affects everything around them, from the physical environment to the behaviors even the emotions of both friends and enemies.', 'Android, Linux, Xbox 360, Mac, Xbox, PC, PlayStation 3', 'Valve', 'Valve', '2004-10-15', 66622),
(154, 'The Walking Dead: S1', 6.99, 'The Walking Dead: Season One (also known as The Walking Dead: The Game) is an episodic interactive drama graphic adventure video game developed and published by Telltale Games. Based on Robert Kirkmans The Walking Dead comic book series, the game consists of five episodes, released between April and November 2012. It is available for Android, iOS, Kindle Fire HDX, Microsoft Windows, Mac OS X, PlayStation 3, PlayStation Vita, Xbox 360, PlayStation 4 and Xbox One. The game is the first of The Walking Dead video game series published by Telltale.', ' Android, Xbox One, PlayStation 4, Xbox 360, PC, Nintendo Switch, PlayStation 3', 'Telltale Games', 'Telltale Games', '2012-04-23', 15153),
(155, 'Crusader Kings III', 22.99, 'Like its predecessors Crusader Kings and Crusader Kings II, Crusader Kings III is a grand strategy game and dynasty simulator set in the Middle Ages. Players begin as a character in either 867 or 1066. The game map is about four times more detailed than the one in Crusader Kings II and slightly larger, incorporating Europe, Africa roughly as far south as the Equator, and Asia as far East as Tibet. Upon the death or deposition of a players character they may continue to play as that characters heir. Overall, players develop a dynasty over the centuries, with the game ending in 1453.', 'Linux, Mac, PlayStation 5, PC, Xbox Series S/X', 'Paradox Development Studios', 'Paradox Interactive', '2020-01-08', 845433),
(156, 'Counter Strike: GO', 12.99, 'Counter-Strike: Global Offensive (CS:GO) is a first-person shooter video game which is a part of the Counter-Strike series. It was announced to the public on August 12, 2011, and is developed by Valve Corporation and their partner, Hidden Path Entertainment. The game was later released on August 21, 2012 for the Playstation 3, Xbox 360, Microsoft Windows, macOS and later Linux as a downloadable title.', 'Linux, Xbox 360, Mac, PC, PlayStation 3', 'Valve / Hidden Path Entertainment', 'Valve ', '2012-08-20', 73221),
(157, 'Detroit: Become Human', 65.99, 'Set in Detroit during the year 2038, the city has been revitalized by the invention and introduction of androids into everyday life. But when androids start behaving as if they are alive, events begin to spin out of control. Step into the roles of the story’s pivotal three playable characters (Kara, Connor, and Markus), each with unique perspectives, motivations and abilities as they face their true selves and question their values. These three androids are present throughout the game as they follow through an emotional journey with choices that must be taken in order for their ultimate cause, which can be defined many different ways depending on the values of the player. The plot of the game deals with a variety of mature themes that explore moral ground and each player decision affects what will happen.', 'PlayStation 4, PC', 'Quantic Dream', 'Sony Interactive Entertainment / Quantic Dream', '2018-05-24', 71123),
(158, 'Tomb Raider', 17.99, 'Tomb Raider (often referred to as: Tomb Raider: A Survivor is Born) is the tenth game in the Tomb Raider series and the first game in Crystal Dynamics second reboot of the game series. A new intense and gritty origin story of Lara Croft and her ascent from a frightened young woman to a hardened survivor. Armed only with raw instincts and the ability to push beyond the limits of human endurance, Lara must fight to unravel the dark history of a forgotten island to escape its relentless hold.', 'Linux, Xbox 360, Mac, PC, PlayStation 3', 'Crystal Dynamics', 'Square Enix Europe', '2013-03-03', 35222);

-- --------------------------------------------------------

--
-- Table structure for table `game_genre`
--

CREATE TABLE `game_genre` (
  `game_id` bigint(20) UNSIGNED NOT NULL,
  `genre_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game_genre`
--

INSERT INTO `game_genre` (`game_id`, `genre_id`) VALUES
(124, 1),
(125, 1),
(128, 1),
(131, 1),
(132, 1),
(133, 1),
(134, 1),
(136, 1),
(137, 1),
(142, 1),
(143, 1),
(144, 1),
(145, 1),
(151, 1),
(153, 1),
(156, 1),
(158, 1),
(124, 2),
(126, 2),
(128, 2),
(130, 2),
(131, 2),
(133, 2),
(134, 2),
(135, 2),
(136, 2),
(137, 2),
(138, 2),
(142, 2),
(144, 2),
(145, 2),
(149, 2),
(151, 2),
(153, 2),
(154, 2),
(157, 2),
(158, 2),
(124, 3),
(126, 3),
(130, 3),
(132, 3),
(133, 3),
(135, 3),
(142, 3),
(143, 3),
(144, 3),
(147, 3),
(151, 3),
(154, 3),
(134, 4),
(150, 4),
(157, 4),
(143, 5),
(146, 5),
(150, 5),
(155, 5),
(156, 5),
(139, 6),
(146, 6),
(152, 6),
(124, 8),
(125, 8),
(128, 8),
(132, 8),
(134, 8),
(137, 8),
(143, 8),
(144, 8),
(145, 8),
(153, 8),
(156, 8),
(158, 8),
(134, 9),
(137, 9),
(143, 9),
(153, 9),
(154, 9),
(138, 11),
(144, 11),
(132, 51),
(133, 51),
(137, 51),
(142, 51),
(144, 51),
(133, 52),
(135, 52),
(138, 52),
(144, 52),
(149, 52),
(150, 52),
(153, 52),
(136, 54),
(147, 54),
(149, 54),
(151, 54),
(157, 54),
(158, 54),
(127, 56),
(139, 56),
(135, 59),
(138, 59),
(146, 59),
(147, 59),
(149, 59),
(127, 60),
(135, 60),
(138, 60),
(139, 60),
(146, 60),
(149, 60),
(152, 60),
(155, 60);

-- --------------------------------------------------------

--
-- Table structure for table `game_image`
--

CREATE TABLE `game_image` (
  `game_id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game_image`
--

INSERT INTO `game_image` (`game_id`, `image`, `id`) VALUES
(124, 'uploads\\image-1731589815408-237302053.jpg', 169),
(124, 'uploads\\image-1731589815419-311152678.jpg', 170),
(124, 'uploads\\image-1731589815423-265072845.jpg', 171),
(124, 'uploads\\image-1731589815438-399721552.jpg', 172),
(125, 'uploads\\image-1731684614533-274067205.jpg', 173),
(125, 'uploads\\image-1731684614537-907240224.jpg', 174),
(125, 'uploads\\image-1731684614541-608277822.jpg', 175),
(125, 'uploads\\image-1731684614543-63684152.jpg', 176),
(126, 'uploads\\image-1731685021872-959537432.jpg', 177),
(126, 'uploads\\image-1731685021873-682099999.jpg', 178),
(126, 'uploads\\image-1731685021875-403021498.jpg', 179),
(126, 'uploads\\image-1731685021880-423567058.jpg', 180),
(127, 'uploads\\image-1731685203672-427815156.jpg', 181),
(127, 'uploads\\image-1731685203678-417223333.jpg', 182),
(127, 'uploads\\image-1731685203683-975690006.jpg', 183),
(127, 'uploads\\image-1731685203688-266879301.jpg', 184),
(128, 'uploads\\image-1731685345006-234742024.jpg', 185),
(128, 'uploads\\image-1731685345008-553955577.jpg', 186),
(128, 'uploads\\image-1731685345010-282647010.jpg', 187),
(128, 'uploads\\image-1731685345015-226214645.jpg', 188),
(129, 'uploads\\image-1731685472867-379550526.jpg', 189),
(129, 'uploads\\image-1731685472870-407531430.jpg', 190),
(129, 'uploads\\image-1731685472871-175640719.jpg', 191),
(129, 'uploads\\image-1731685472875-867630076.jpg', 192),
(130, 'uploads\\image-1731685587414-487365980.jpg', 193),
(130, 'uploads\\image-1731685587420-587773814.jpg', 194),
(130, 'uploads\\image-1731685587421-845260882.jpg', 195),
(130, 'uploads\\image-1731685587423-516581987.jpg', 196),
(131, 'uploads\\image-1731685705015-602101977.jpg', 197),
(131, 'uploads\\image-1731685705017-560343329.jpg', 198),
(131, 'uploads\\image-1731685705022-746740301.jpg', 199),
(131, 'uploads\\image-1731685705024-34284856.jpg', 200),
(132, 'uploads\\image-1731686068482-770569489.jpg', 201),
(132, 'uploads\\image-1731686068484-356550084.jpg', 202),
(132, 'uploads\\image-1731686068485-430365555.jpg', 203),
(132, 'uploads\\image-1731686068485-181119693.jpg', 204),
(133, 'uploads\\image-1731686220282-935204768.jpg', 205),
(133, 'uploads\\image-1731686220283-835165626.jpg', 206),
(133, 'uploads\\image-1731686220284-39589904.jpg', 207),
(133, 'uploads\\image-1731686220290-927128457.jpg', 208),
(135, 'uploads\\image-1731686470009-646737996.jpg', 209),
(135, 'uploads\\image-1731686470010-518168473.jpg', 210),
(135, 'uploads\\image-1731686470019-67336939.jpg', 211),
(135, 'uploads\\image-1731686470025-885703380.jpg', 212),
(134, 'uploads\\image-1731686486383-115164685.jpg', 213),
(134, 'uploads\\image-1731686486387-741471367.jpg', 214),
(134, 'uploads\\image-1731686486392-363533495.jpg', 215),
(134, 'uploads\\image-1731686486395-396503391.jpg', 216),
(136, 'uploads\\image-1731686700403-595065397.jpg', 217),
(136, 'uploads\\image-1731686700406-942728821.jpg', 218),
(136, 'uploads\\image-1731686700409-307553548.jpg', 219),
(136, 'uploads\\image-1731686700412-424048760.jpg', 220),
(137, 'uploads\\image-1731686827992-939519734.jpg', 221),
(137, 'uploads\\image-1731686828000-718755584.jpg', 222),
(137, 'uploads\\image-1731686828000-802199187.jpg', 223),
(137, 'uploads\\image-1731686828002-7185155.jpg', 224),
(138, 'uploads\\image-1731686946785-318143737.jpg', 225),
(138, 'uploads\\image-1731686946786-383588580.jpg', 226),
(138, 'uploads\\image-1731686946787-714729609.jpg', 227),
(138, 'uploads\\image-1731686946787-472378214.jpg', 228),
(139, 'uploads\\image-1731687059571-511905445.jpg', 229),
(139, 'uploads\\image-1731687059572-977808616.jpg', 230),
(139, 'uploads\\image-1731687059576-128392976.jpg', 231),
(139, 'uploads\\image-1731687059581-963721057.jpg', 232),
(142, 'uploads\\image-1731741985913-409648080.jpg', 233),
(142, 'uploads\\image-1731741985920-770838749.jpg', 234),
(142, 'uploads\\image-1731741985927-512232563.jpg', 235),
(142, 'uploads\\image-1731741985936-554010009.jpg', 236),
(143, 'uploads\\image-1731742105052-476135519.jpg', 237),
(143, 'uploads\\image-1731742105062-123095695.jpg', 238),
(143, 'uploads\\image-1731742105072-854573695.jpg', 239),
(143, 'uploads\\image-1731742105074-412250241.jpg', 240),
(144, 'uploads\\image-1731742216001-971790472.jpg', 241),
(144, 'uploads\\image-1731742216010-588979986.jpg', 242),
(144, 'uploads\\image-1731742216015-703871470.jpg', 243),
(144, 'uploads\\image-1731742216024-681190198.jpg', 244),
(145, 'uploads\\image-1731742315506-660247641.jpg', 245),
(145, 'uploads\\image-1731742315509-531851634.jpg', 246),
(145, 'uploads\\image-1731742315513-282057930.jpg', 247),
(145, 'uploads\\image-1731742315516-960797334.jpg', 248),
(146, 'uploads\\image-1731742402941-70016457.jpg', 249),
(146, 'uploads\\image-1731742402961-241004934.jpg', 250),
(146, 'uploads\\image-1731742402961-931685180.jpg', 251),
(146, 'uploads\\image-1731742402963-996956130.jpg', 252),
(147, 'uploads\\image-1731742527452-809894992.jpg', 253),
(147, 'uploads\\image-1731742527455-265035708.jpg', 254),
(147, 'uploads\\image-1731742527457-342305707.jpg', 255),
(147, 'uploads\\image-1731742527460-838001513.jpg', 256),
(148, 'uploads\\image-1731742646154-600470726.jpg', 257),
(148, 'uploads\\image-1731742646157-150759688.jpg', 258),
(148, 'uploads\\image-1731742646160-178266474.jpg', 259),
(148, 'uploads\\image-1731742646173-616430114.jpg', 260),
(149, 'uploads\\image-1731742732421-328205048.jpg', 261),
(149, 'uploads\\image-1731742732424-75024214.jpg', 262),
(149, 'uploads\\image-1731742732426-705519789.jpg', 263),
(149, 'uploads\\image-1731742732434-619352009.jpg', 264),
(150, 'uploads\\image-1731742829619-512348517.jpg', 265),
(150, 'uploads\\image-1731742829622-315314914.jpg', 266),
(150, 'uploads\\image-1731742829634-73652238.jpg', 267),
(150, 'uploads\\image-1731742829649-521487686.jpg', 268),
(151, 'uploads\\image-1731742925865-972836240.jpg', 269),
(151, 'uploads\\image-1731742925869-554757612.jpg', 270),
(151, 'uploads\\image-1731742925875-409359350.jpg', 271),
(151, 'uploads\\image-1731742925886-685253654.jpg', 272),
(152, 'uploads\\image-1731743016641-786834902.jpg', 273),
(152, 'uploads\\image-1731743016646-587598582.jpg', 274),
(152, 'uploads\\image-1731743016652-841461841.jpg', 275),
(152, 'uploads\\image-1731743016663-497270732.jpg', 276),
(153, 'uploads\\image-1731743101379-678371072.jpg', 277),
(153, 'uploads\\image-1731743101388-717100064.jpg', 278),
(153, 'uploads\\image-1731743101390-534669467.jpg', 279),
(153, 'uploads\\image-1731743101393-312892608.jpg', 280),
(154, 'uploads\\image-1731743193986-302839784.jpg', 281),
(154, 'uploads\\image-1731743193990-111129614.jpg', 282),
(154, 'uploads\\image-1731743193991-128830127.jpg', 283),
(154, 'uploads\\image-1731743194000-664505790.jpg', 284),
(155, 'uploads\\image-1731743288167-553831232.jpg', 285),
(155, 'uploads\\image-1731743288170-501404108.jpg', 286),
(155, 'uploads\\image-1731743288179-273877059.jpg', 287),
(155, 'uploads\\image-1731743288188-856800092.jpg', 288),
(156, 'uploads\\image-1731743388276-723544198.jpg', 289),
(156, 'uploads\\image-1731743388278-296308238.jpg', 290),
(156, 'uploads\\image-1731743388281-497582859.jpg', 291),
(156, 'uploads\\image-1731743388289-620429714.jpg', 292),
(157, 'uploads\\image-1731743482222-897017496.jpg', 293),
(157, 'uploads\\image-1731743482225-739022900.jpg', 294),
(157, 'uploads\\image-1731743482232-137945471.jpg', 295),
(157, 'uploads\\image-1731743482247-358741613.jpg', 296),
(158, 'uploads\\image-1731743575012-181602620.jpg', 297),
(158, 'uploads\\image-1731743575019-666719710.jpg', 298),
(158, 'uploads\\image-1731743575024-896333501.jpg', 299),
(158, 'uploads\\image-1731743575034-904716927.jpg', 300);

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `name`) VALUES
(1, 'Action'),
(2, 'Adventure'),
(59, 'Casual'),
(10, 'Fighting'),
(9, 'Horror'),
(60, 'Party'),
(53, 'Platformer'),
(54, 'Puzzle'),
(56, 'Racing'),
(3, 'Role-Playing'),
(51, 'RPG'),
(52, 'Sandbox'),
(8, 'Shooter'),
(4, 'Simulation'),
(6, 'Sports'),
(5, 'Strategy'),
(11, 'Survival');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','User') NOT NULL DEFAULT 'User',
  `phone` varchar(10) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `phone`, `email`, `fullname`) VALUES
(61, 'tanchuoi', '$2b$10$nkVNmYkSJ.DtjwiIbfjh0uNBVV1EnHuiYi8Wl5rfq2mQTbBB47mGO', 'Admin', NULL, 'dhttgaming@gmail.com', ''),
(62, 'anonymous ', 'anonymous', 'User', NULL, '', ''),
(64, 'thanhtan', '$2b$10$VvexJflS88I36Hv.ZIDPguspm0bi7Z/vadWAO/x8A/3d2rfDUVqIS', 'User', NULL, 'thanhtan@gmail.com', ''),
(65, 'thanhtan1234', '$2b$10$nim1X.DvyUQMyVD7Luf9I.msoa8CgSr0tNYMRjZ5vqJ4Iqf973/HO', 'User', NULL, 'thanhtan1234@gmail.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `game_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`user_id`, `game_id`) VALUES
(61, 124),
(61, 126),
(61, 127),
(61, 129),
(61, 130),
(61, 131),
(61, 148),
(64, 124);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_user_id` (`user_id`);

--
-- Indexes for table `cart_game`
--
ALTER TABLE `cart_game`
  ADD PRIMARY KEY (`game_id`,`cart_id`),
  ADD KEY `cart_game_cart_id_foreign` (`cart_id`);

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `game_genre`
--
ALTER TABLE `game_genre`
  ADD PRIMARY KEY (`genre_id`,`game_id`),
  ADD KEY `game_genre_game_id` (`game_id`);

--
-- Indexes for table `game_image`
--
ALTER TABLE `game_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_image_game_id` (`game_id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_username_unique` (`username`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`user_id`,`game_id`),
  ADD KEY `wishlist_game_id` (`game_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- AUTO_INCREMENT for table `game_image`
--
ALTER TABLE `game_image`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=324;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cart_game`
--
ALTER TABLE `cart_game`
  ADD CONSTRAINT `cart_game_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_game_game_id_foreign` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `game_genre`
--
ALTER TABLE `game_genre`
  ADD CONSTRAINT `game_genre_game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `game_genre_genre_id` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `game_image`
--
ALTER TABLE `game_image`
  ADD CONSTRAINT `game_image_game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
