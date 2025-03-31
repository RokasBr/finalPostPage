const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const postDb = require("../schemas/postSchema");
const Message = require("../schemas/messageSchema");

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body;

        const userExists = await userSchema.findOne({ username });

        if (userExists) return res.send({ message: "User already exists" });

        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new userSchema({
            username,
            password: hash,
            favorites: [] // Initialize an empty favorites array
        });

        await newUser.save();
        res.send({ success: true });
    },

    login: async (req, res) => {
        const { username, password } = req.body;

        const myUser = await userSchema.findOne({ username });

        if (!myUser) return res.send({ success: false, message: "Invalid credentials" });

        const samePassword = await bcrypt.compare(password, myUser.password);

        if (!samePassword) return res.send({ success: false, message: "Invalid credentials" });

        let user = {
            username: myUser.username,
            _id: myUser._id,
            favorites: myUser.favorites
        };

        const token = jwt.sign(user, process.env.SECRET_KEY);
        return res.send({ success: true, token, user });
    },

    getUser: async (req, res) => {
        const token = req.headers.authorization;
        if (!token) return res.send({ success: false, message: "No token provided" });

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await userSchema.findById(decoded._id).select("-password").populate("favorites");

            if (!user) return res.send({ success: false, message: "User not found" });

            res.send({ success: true, user });
        } catch (error) {
            res.send({ success: false, message: "Invalid token" });
        }
    },

    // getUsers: async (req, res) => {
    //     const users = await userSchema.find({}, { password: 0 });
    //
    //     const items = users.map(item => ({
    //         username: item.username,
    //         id: item._id,
    //         favorites: item.favorites || []
    //     }));
    //
    //     res.send({ success: true, users: items });
    // },

    getPosts: async (req, res) => {
        const posts = await postDb.find();
        res.send({ success: true, posts });
    },

    createPost: async (req, res) => {
        const { title, image, description, owner, createdAt } = req.body;

        const post = new postDb({
            title,
            image,
            description,
            owner,
            createdAt
        });

        await post.save();
        res.send({ success: true });
    },

    removePost: async (req, res) => {
        const id = req.params.id;
        await postDb.findOneAndDelete({ _id: id });

        const posts = await postDb.find();
        res.send({ success: true, posts });
    },

    // updatePost: async (req, res) => {
    //     const { id, title, description, image } = req.body;
    //
    //     await postDb.findOneAndUpdate({ _id: id }, { $set: { title, description, image } });
    //
    //     const posts = await postDb.find();
    //     res.send({ success: true, posts });
    // },

    addFavorite: async (req, res) => {
        try {
            const { postId } = req.body;
            console.log("Received request to add favorite:", req.body);

            if (!postId) {
                return res.send({ success: false, message: "Missing postId" });
            }

            const user = await userSchema.findById(req.user._id);
            if (!user) return res.send({ success: false, message: "User not found" });

            if (!user.favorites.includes(postId)) {
                user.favorites.push(postId);
                await user.save();
            }

            res.send({ success: true, favorites: user.favorites });
        } catch (error) {
            console.error("Error adding favorite:", error);
            res.send({ success: false, message: "Error adding favorite" });
        }
    },


    removeFavorite: async (req, res) => {
        try {
            const { postId } = req.body;

            const user = await userSchema.findById(req.user._id);
            if (!user) return res.send({ success: false, message: "User not found" });

            user.favorites = user.favorites.filter(id => id.toString() !== postId);
            await user.save();

            res.send({ success: true, favorites: user.favorites });
        } catch (error) {
            console.error("Error removing favorite:", error);
            res.send({ success: false, message: "Error removing favorite" });
        }
    },

    getFavorites: async (req, res) => {
        try {
            const user = await userSchema.findById(req.user._id).populate("favorites");

            if (!user) return res.send({ success: false, message: "User not found" });

            res.send({ success: true, favorites: user.favorites });
        } catch (error) {
            console.error("Error fetching favorites:", error);
            res.send({ success: false, message: "Error fetching favorites" });
        }
    },
    updateProfile: async (req, res) => {
        try {
            // req.user is set by your userAuth middleware.
            const user = await userSchema.findById(req.user._id);
            if (!user) return res.send({ success: false, message: "User not found" });

            const { username, password, photoURL } = req.body;
            console.log('REQ BODY', photoURL);

            if (username) {
                // Check if there's an existing user with the same username
                const existingUser = await userSchema.findOne({ username });
                // If found and it's not the current user, then the username is taken.
                if (existingUser && existingUser._id.toString() !== user._id.toString()) {
                    return res.send({ success: false, message: "Username already taken" });
                }
                user.username = username;
            }
            if (photoURL) user.profileImage = photoURL;
            if (password) {
                const hash = await bcrypt.hash(password, 10);
                user.password = hash;
            }

            await user.save();

            // Re-fetch the user without the password and populate favorites
            const updatedUser = await userSchema.findById(req.user._id)
                .select("-password")
                .populate("favorites");
            res.send({ success: true, user: updatedUser });
        } catch (error) {
            console.error("Error updating profile:", error);
            res.send({ success: false, message: "Error updating profile" });
        }
    },
    getUserByUsername: async (req, res) => {
        try {
            const username = req.params.username;
            const user = await userSchema.findOne({ username }).select("-password").populate("favorites");
            if (!user) return res.status(404).json({ success: false, message: "User not found" });

            // Optionally, fetch the user's posts if needed:
            const posts = await postDb.find({ owner: username });

            res.json({ success: true, user: { ...user.toObject(), posts } });
        } catch (error) {
            console.error("Error in getUserByUsername:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    },
    getPostById: async (req, res) => {
        try {
            const { post_id } = req.params;
            const post = await postDb.findById(post_id).populate("comments.user", "username");

            if (!post) return res.send({ success: false, message: "Post not found" });

            res.send({ success: true, post });
        } catch (error) {
            console.error("Error fetching post:", error);
            res.send({ success: false, message: "Server error" });
        }
    },
    addComment: async (req, res) => {
        try {
            const { post_id } = req.params;
            const { text } = req.body;
            const username = req.user.username;

            console.log("vot ", req.user)

            const post = await postDb.findById(post_id);
            if (!post) return res.send({ success: false, message: "Post not found" });

            post.comments.push({ user: username, text, createdAt: new Date() });
            await post.save();

            res.send({ success: true, comments: post.comments });
        } catch (error) {
            console.error("Error adding comment:", error);
            res.send({ success: false, message: "Error adding comment" });
        }
    },
    getUserPosts: async (req, res) => {
        try {
            const { username } = req.params;

            // Fetch posts created by this user
            const posts = await postDb.find({ owner: username });

            res.json({ success: true, posts });
        } catch (error) {
            console.error("Error fetching user posts:", error);
            res.status(500).json({ success: false, message: "Error fetching user posts" });
        }
    },
    sendMessage: async (req, res) => {
        try {
            const { recipient, text } = req.body;
            if (!recipient || !text) return res.send({ success: false, message: "Recipient and text required" });
            const newMessage = await new Message({ sender: req.user._id, recipient, text }).save();
            console.log("Message created:", newMessage);
            res.send({ success: true, message: "Message sent" });
        } catch {
            res.send({ success: false, message: "Internal Server Error" });
        }
    },

    // sendMessage: async (req, res) => {
    //     const { receiver, message, user } = req.body;
    //     const conversationExist = await conversationDb.findOne({ participants: { $all: [receiver, user.username] } });
    //
    //     const currentMessage = {
    //         sender: user.username,
    //         message,
    //         time: Date.now()
    //     };
    //
    //     let updatedConvo;
    //     if (conversationExist) {
    //         updatedConvo = await conversationDb.findOneAndUpdate(
    //             { _id: conversationExist._id },
    //             { $push: { messages: currentMessage } },
    //             { new: true }
    //         );
    //     } else {
    //         const convo = new conversationDb({
    //             participants: [receiver, user.username],
    //             messages: [currentMessage],
    //             lastMessage: message
    //         });
    //         updatedConvo = await convo.save();
    //     }
    //
    //     // Emit new message via Socket.io
    //     const receiverOnline = onlineUsers.getUser(receiver);
    //     if (receiverOnline) {
    //         io.to(receiverOnline.id).emit("newMessage", currentMessage);
    //     }
    //
    //     res.send({ success: true, conversation: updatedConvo.messages });
    // },
    getMessages: async (req, res) => {
        try {
            console.log("User ID:", req.user._id); // Check if userId exists

            const userId = req.user._id;
            const messages = await Message.find({
                $or: [{ sender: userId }, { recipient: userId }]
            })
                .sort({ createdAt: -1 })
                .populate("sender", "username")
                .populate("recipient", "username");

            console.log("Fetched Messages:", messages); // Debugging output

            res.send({ success: true, messages });
        } catch (error) {
            console.error("Error fetching messages:", error);
            res.send({ success: false, message: "Internal Server Error" });
        }
    },
    deleteMessage: async (req, res) => {
        try {
            const { messageId } = req.body;
            const message = await Message.findById(messageId);
            if (!message || (message.sender.toString() !== req.user._id.toString() && message.recipient.toString() !== req.user._id.toString())) {
                return res.send({ success: false, message: "Unauthorized" });
            }
            await message.deleteOne();
            res.send({ success: true, message: "Message deleted" });
        } catch {
            res.send({ success: false, message: "Internal Server Error" });
        }
    },

};


