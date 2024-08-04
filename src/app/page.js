'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Modal, TextField, AppBar, Toolbar } from '@mui/material'
import Button from '@mui/material/Button'
import { firestore } from '../../firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const item = [
  'cupcake',
  'brownie',
  'cookie',
  'cake',
  'pie',
  'muffin',
  'scone',
  'bread',
  'croissant',
  'donut',
  'bagel',
  'pretzel',
  'biscuit',
  'roll',
  'tart',
  
] 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 14,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Home() {
  // We'll add our component logic here
	const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
	const [itemName, setItemName] = useState('')

	const updateInventory = async () => {
  	  const snapshot = query(collection(firestore, 'inventory'))
  	  const docs = await getDocs(snapshot)
  	  const inventoryList = []
  	  docs.forEach((doc) => {
    	    inventoryList.push({ name: doc.id, ...doc.data() })
  	  })
  	  setInventory(inventoryList)
	}

	useEffect(() => {
  	  updateInventory()
	}, [])

	const addItem = async (item) => {
  	  const docRef = doc(collection(firestore, 'inventory'), item)
  	  const docSnap = await getDoc(docRef)
  	  if (docSnap.exists()) {
    	    const { quantity } = docSnap.data()
    	    await setDoc(docRef, { quantity: quantity + 1 })
  	  } else {
    	    await setDoc(docRef, { quantity: 1 })
  	  }
  	  await updateInventory()
	}

	const removeItem = async (item) => {
  	  const docRef = doc(collection(firestore, 'inventory'), item)
  	  const docSnap = await getDoc(docRef)
  	  if (docSnap.exists()) {
    	    const { quantity } = docSnap.data()
    	    if (quantity === 1) {
      	      await deleteDoc(docRef)
    	    } else {
      	      await setDoc(docRef, { quantity: quantity - 1 })
    	    }
  	}
  	await updateInventory()
      }

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            Pantry Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box border={'1px solid #333'}>
        <Box
          width="800px"
          height="100px"
          bgcolor={'#F8F8F8'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
            Inventory Items
          </Typography>
        </Box>
        <table style={{ width: '800px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'center', padding: '10px' }}>Item</th>
              <th style={{ textAlign: 'center', padding: '10px' }}>Quantity</th>
              <th style={{ textAlign: 'center', padding: '10px' }}>Actions</th>
              <th style={{ textAlign: 'center', padding: '10px' }}>Description</th>
              <th style={{ textAlign: 'center', padding: '10px' }}>Unit Cost</th>
              <th style={{ textAlign: 'center', padding: '10px' }}>Category</th>
              <th style={{ textAlign: 'center', padding: '10px' }}>Expiration Date</th>
              
            </tr>
          </thead>
          <tbody>
            {inventory.map(({ name, quantity }) => (
              <tr key={name}>
                <td style={{ textAlign: 'center', padding: '10px' }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </td>
                <td style={{ textAlign: 'center', padding: '10px' }}>
                  {quantity}
                </td>
                <td style={{ textAlign: 'center', padding: '10px' }}>
                  <Button variant="contained" onClick={() => removeItem(name)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  )
}

