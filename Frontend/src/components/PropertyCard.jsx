import {
    Card, CardMedia, CardContent, Typography, CardActions, Button,
} from '@mui/material';

const PropertyCard = ({ property, showActions, onDelete, onEdit }) => {
    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardMedia
                component="img"
                height="180"
                image={property.imageUrl || 'https://via.placeholder.com/300x180'}
                alt={property.title}
            />
            <CardContent>
                <Typography variant="h6">{property.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {property.location}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>₹ {property.price}</Typography>
            </CardContent>
            {showActions && (
                <CardActions>
                    <Button size="small" color="error" onClick={() => onDelete(property._id)}>Delete</Button>
                    <Button size="small" onClick={() => onEdit(property)}>Edit</Button>
                </CardActions>
            )}
        </Card>
    );
};

export default PropertyCard;
