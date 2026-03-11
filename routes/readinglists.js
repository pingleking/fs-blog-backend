const router = require('express').Router()
const { tokenExtractor } = require('../utils/middleware')
const { Readinglist } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    const { userId, blogId } = req.body
    const existing = await Readinglist.findOne({
      where: { userId, blogId }
    })
    if (existing) {
      return res.status(400).json({ 
        error: 'Blog already in reading list' 
      })
    }
    const readingListItem = await Readinglist.create(req.body)
    res.json(readingListItem)
  } catch(error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const readingListItem = await Readinglist.findByPk(req.params.id)
    if (!readingListItem) {
      return res.status(404).json({ error: 'Reading not found in readinglist' })
    }
    if (readingListItem.userId !== req.decodedToken.id) {
      return res.status(401).json({ error: 'You can only modify your own reading list entries' })
    }
    readingListItem.read = req.body.read
    await readingListItem.save()
    res.json(readingListItem)
  } catch(error) {
    next(error)
  }
})

module.exports = router