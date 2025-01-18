import express from "express";
import {
  CreateService,
  deleteService,
  getAllService,
  getDataById,
  UpdateSerivce,
} from "../controllers/service.controller.js";
import {
  createblog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blog.controller.js";
import {
  createFaq,
  deleteFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
} from "../controllers/faq.controller.js";
import {
  deleteContactById,
  getAllContacts,
  getContactById,
  postContact,
} from "../controllers/contact.controller.js";
import { adminLogin } from "../controllers/admin.controller.js";
import { adminAuth } from "../middleware/Adminauth.js";

const router = express.Router();

//admin login

router.post("/login", adminLogin);

//Service Routes
router.post("/service-create",adminAuth, CreateService);
router.patch("/service-update/:id",adminAuth, UpdateSerivce);
router.get("/getAllservice", getAllService);
router.delete("/delete-service/:id", adminAuth,deleteService);
router.get("/getservice/:id", getDataById);

//Blogs Routes
router.post("/blog-create",adminAuth, createblog);
router.patch("/blog-update/:id",adminAuth, updateBlog);
router.get("/getAllblog", getAllBlogs);
router.delete("/delete-blog/:id", adminAuth,deleteBlog);
router.get("/getblog/:id", getBlogById);

//FAQ Routes
router.post("/faq-create",adminAuth, createFaq);
router.patch("/faq-update/:id",adminAuth, updateFaq);
router.get("/getAllfaq", getAllFaqs);
router.delete("/delete-faq/:id",adminAuth, deleteFaq);
router.get("/getfaq/:id", getFaqById);



//Contact Routes
router.post("/postcontact", postContact);
router.get("/getAllcontact", adminAuth,getAllContacts);
router.get("/getcontact-one/:id", adminAuth,getContactById);
router.delete("/delete-contact/:id", adminAuth,deleteContactById);


export default router;
