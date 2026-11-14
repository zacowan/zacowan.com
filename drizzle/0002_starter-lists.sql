INSERT INTO "lists" ("slug", "name", "description") VALUES
 ('movies', 'Movies', 'Films I have watched, with my ratings and notes.'),
 ('places', 'Places', 'Places I have been, with my ratings and notes.')
ON CONFLICT ("slug") DO NOTHING;
