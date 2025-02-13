import { app } from "./app";
import { SETTINGS } from "./configs/settings";
import { connectToDatabase } from "./shared/infrastructures/db/mongo-db";
import { blogsQueryRepository, blogsCommandRepository } from "./configs/compositions/blogs.composition";
import { postsQueryRepository, postsCommandRepository } from "./configs/compositions/posts.composition";
import {usersQueryRepository} from "./configs/compositions/auth.composition";
import {usersCommandRepository} from "./configs/compositions/users-composition";

async function startApp() {
    try {
        await connectToDatabase();
        console.log('Connected to MongoDB');
        blogsQueryRepository.init();
        blogsCommandRepository.init();
        postsQueryRepository.init();
        postsCommandRepository.init();
        usersQueryRepository.init();
        usersCommandRepository.init();

        app.listen(SETTINGS.PORT, () => {
            console.log(`Server started on port: ${SETTINGS.PORT}`);
        });
    } catch (e) {
        console.log('Server error:', e);
        process.exit(1);
    }
}

startApp();