import { Box, Grid, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { database } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const ViewPet = () => {
  const params = useParams();
  const petId = params.petId;
  const [petData, setPetData] = useState(undefined);

  useEffect(() => {
    const collectionRef = collection(database, 'petlist');
    getDocs(collectionRef).then((response) => {
      setPetData({ ...response.docs[petId - 1].data(), id: response.id });
    });
  }, [petId]);
  console.log(petData, 'PET DATA');
  return (
    <Grid container spacing={6}>
      {petData && (
        <>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                marginTop: '10px',
                justifyContent: 'center',
                height: '27rem',
              }}
            >
              <Paper
                elevation={5}
                sx={{ borderRadius: '25px', overflow: 'hidden' }}
              >
                <img src={petData.picture} alt="petdog" />
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ paddingX: 1, paddingBottom: 1 }}>
              <Typography variant="h2" component="h3">
                {petData.name}
              </Typography>
              <Box
                display={'flex'}
                flexDirection={'column'}
                flexWrap={'wrap'}
                justifyContent="space-between"
              >
                <Typography>{petData.gender}</Typography>
                <Typography>{petData.breed}</Typography>
              </Box>
              <Typography>{petData.location}</Typography>
            </Box>
            <Box>
              <Typography variant="h2" component="h3">
                CONTACT DETAILS
              </Typography>
              <Typography>{petData.contactdetails.name}</Typography>
              <Typography>{petData.contactdetails.phone}</Typography>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ViewPet;
