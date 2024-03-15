# ginder

ok so in the test_db.js we have {names, description} onn line 105. these two are sets of the names and description for a small batch

i tried exporting on line 116 but idk if that worked

when i go to test_db.ts adn try to import names and descroption i either get

Module '"./test_db.js"' declares 'names' locally, but it is not exported.

or

import { names, description } from 'test_db.js';





