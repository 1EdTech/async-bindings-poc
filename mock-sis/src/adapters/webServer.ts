import express, { Request, Response } from 'express';
import path from 'path';
import { addPerson, addCourse, getCounts, getAllPersons, getAllCourses, clearAllData } from './commands';

const app = express();
const PORT = process.env.PORT || 3000;

// EJS view engine setup
const viewsPath = path.join(__dirname, '../views');
app.set('view engine', 'ejs');
app.set('views', viewsPath);
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
  const counts = await getCounts();
  const cleared = req.query.cleared === '1';
  res.render('index', { counts, cleared });
});

app.get('/students', async (req: Request, res: Response) => {
  const counts = await getCounts();
  const students = await getAllPersons();
  res.render('students', { personCount: counts.personCount, students });
});

app.post('/students/add', async (req: Request, res: Response) => {
  await addPerson();
  res.redirect('/students');
});

app.get('/courses', async (req: Request, res: Response) => {
  const counts = await getCounts();
  const courses = await getAllCourses();
  res.render('courses', { courseCount: counts.courseCount, courses });
});

app.post('/courses/add', async (req: Request, res: Response) => {
  await addCourse();
  res.redirect('/courses');
});

app.post('/clear-all', async (req: Request, res: Response) => {
  await clearAllData();
  res.redirect('/?cleared=1');
});

app.post('/add-person', async (req: Request, res: Response) => {
  await addPerson();
  res.redirect('/');
});

app.post('/add-course', async (req: Request, res: Response) => {
  await addCourse();
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`SSR web server running at http://localhost:${PORT}`);
}); 