// 创建
app.post('/test', async (req, res) => {
  try {
    const post = await prisma.test.create({
      data: req.body,
    });
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 获取所有帖子
app.get('/test', async (req, res) => {
  try {
    const posts = await prisma.test.findMany();
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 获取单个帖子
app.get('/test/:id', async (req, res) => {
  try {
    const post = await prisma.test.findUnique({
      where: { id: parseInt(req.params.id, 10) },
    });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});