import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3001;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Set the view engine to EJS
app.set("view engine", "ejs");

// blogs as database
const blogs = [
  {
    id: "iasdofis-asdifso",
    title: "The Rise of AI in Web Development: What You Need to Know",
    post: `Artificial Intelligence (AI) is rapidly transforming the landscape of web development. From AI-powered chatbots that enhance user engagement to algorithms that automatically optimize site performance, the possibilities are endless. In this blog post, we’ll explore how AI is being integrated into web development processes, the tools available for developers, and the impact AI could have on the future of the web. Whether you're a seasoned developer or just starting, understanding AI's role in web development is crucial for staying ahead in the tech world.`,
  },
  {
    id: "aosdif-alsdofaisd",
    title: "Understanding JavaScript ES2024: New Features and Enhancements",
    post: `JavaScript continues to evolve with the release of ES2024, bringing new features and enhancements that streamline development and improve performance. This article delves into the most exciting additions, including pattern matching, the pipeline operator, and improved module support. We’ll also discuss how these new features can be leveraged to write cleaner, more efficient code. Stay tuned as we break down each feature, providing examples and practical use cases to help you integrate ES2024 into your projects.`,
  },
  {
    id: "oioaidoiaos-dsuodulllypi",
    title:
      "The Importance of Cybersecurity in 2024: Protecting Your Web Applications",
    post: `In 2024, cybersecurity remains a top concern for developers and organizations alike. With the increasing sophistication of cyber-attacks, ensuring the security of web applications is more critical than ever. This post covers the latest trends in cybersecurity, common vulnerabilities in web applications, and best practices for securing your code and user data. We’ll also look at the tools and frameworks available to help developers build more secure applications. Don’t leave your web apps vulnerable—learn how to protect them from the latest threats.`,
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs", { blogs });
});

app.get("/create-post", (req, res) => {
  res.render("createPost.ejs");
});

app.get("/manage-blogs", (req, res) => {
  res.render("manageBlog.ejs", { blogs });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

// writing new blog
app.post("/new-post", (req, res) => {
  const newBlog = req.body;
  const uniqueId =
    new Date().getTime().toString() +
    Math.random().toString(36).substring(2, 10);
  blogs.push({ id: uniqueId, ...newBlog });
  res.render("index.ejs", {blogs});

  // res.render("contact.ejs");
});

// deleting an existing blog
app.post("/delete-post/:id", (req, res) => {
  const blogId = req.params.id;
  const deleteBlogIndex = blogs.findIndex((blog) => blog.id === blogId);
  blogs.splice(deleteBlogIndex, 1);
  res.render("manageBlog.ejs", { blogs });
});

// edit post (get)
app.get("/edit/:id", (req, res) => {
  const blogId = req.params.id;
  const blog = blogs.find(blg => blg.id === blogId);
  res.render("editPost.ejs", { blog });
});

// edit post (POST)
app.post("/edit/:id", (req, res) => {
  const updatedBlog = req.body;
  const blogId = req.params.id;
  const blogIndex = blogs.findIndex(blog => blog.id === blogId);
  blogs.splice(blogIndex, 1, updatedBlog)
  res.render("manageBlog.ejs", { blogs });
});

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
