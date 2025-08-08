# Email-Based Artwork Approval System

## Overview
This system allows you to approve artwork submissions by simply replying "APPROVE" to submission emails. The automation handles the rest!

## Setup Instructions

### Step 1: Zapier/Make.com Configuration

#### For Zapier:
1. **Trigger**: Gmail - New Email Matching Search
   - Search string: `subject:"Community Artwork Submission for Review" from:your-email@domain.com`
   - This catches your replies to submission emails

2. **Filter**: Only Continue If...
   - Email body contains "APPROVE" (case insensitive)

3. **Action**: Webhooks by Zapier - POST
   - URL: `https://yourdomain.com/api/add-artwork.php`
   - Method: POST
   - Headers:
     ```
     Authorization: lcstudios_api_2025_secure
     Content-Type: application/json
     ```

#### For Make.com:
1. **Trigger**: Gmail - Watch emails
   - Filter: Subject contains "Community Artwork Submission for Review"

2. **Filter**: Text parser - Match pattern
   - Pattern: Look for "APPROVE" in email body

3. **Action**: HTTP - Make a request
   - URL: `https://yourdomain.com/api/add-artwork.php`
   - Method: POST
   - Headers: Same as above

### Step 2: Data Mapping

The webhook should send this JSON structure:

```json
{
  "artist_name": "{{extracted_from_original_email}}",
  "artwork_title": "{{extracted_from_original_email}}",
  "description": "{{extracted_from_original_email}}",
  "medium": "{{extracted_from_original_email}}",
  "category": "{{extracted_from_original_email}}",
  "image_url": "{{image_attachment_url}}"
}
```

### Step 3: Email Parsing Rules

Your automation should extract these fields from the ORIGINAL submission email:

- **Artist Name**: Look for "artist_name: " or "Name: "
- **Artwork Title**: Look for "artwork_title: " or "Title: "
- **Description**: Look for "artwork_description: " or "Description: "
- **Medium**: Look for "artwork_medium: " or "Medium: "
- **Category**: Look for "artwork_category: " or "Category: "
- **Image**: Download and upload the attachment, get public URL

### Step 4: Image Handling

Options for image URLs:
1. **Upload to your server**: Upload image to `/images/community/` folder
2. **Use cloud storage**: Upload to AWS S3, Cloudinary, or similar
3. **Use attachment URL**: If your email service provides direct URLs

### Step 5: Security

- Change the API key in `/api/add-artwork.php` from `lcstudios_api_2025_secure` to something unique
- Consider adding IP restrictions if needed
- Monitor the API log at `/data/api_log.txt`

## Workflow Example

1. **User submits artwork** → Email sent to you with all details
2. **You reply "APPROVE"** → Zapier/Make detects the reply
3. **Automation extracts data** → Parses original email for artwork info
4. **Image is processed** → Uploaded and public URL generated
5. **API call is made** → Artwork data sent to your website
6. **Artwork appears** → Automatically added to community showcase

## Testing

### Manual API Test:
```bash
curl -X POST https://yourdomain.com/api/add-artwork.php \
  -H "Authorization: lcstudios_api_2025_secure" \
  -H "Content-Type: application/json" \
  -d '{
    "artist_name": "Test Artist",
    "artwork_title": "Test Artwork",
    "description": "Test description",
    "medium": "digital",
    "category": "personal",
    "image_url": "https://example.com/test-image.jpg"
  }'
```

### Debug Mode:
- Check `/data/api_log.txt` for API calls
- Check browser console for JavaScript errors
- Use `refreshApprovedArtworks()` in console to manually refresh

## File Structure

```
/api/add-artwork.php          # API endpoint for adding artwork
/data/approved_artworks.json  # Stores approved artwork data
/data/api_log.txt            # API access log
/community/index.html        # Community page (auto-loads approved artwork)
```

## Backup & Recovery

- Approved artworks are stored in `/data/approved_artworks.json`
- API calls are logged in `/data/api_log.txt`
- Keep regular backups of the `/data/` folder

## Troubleshooting

### Common Issues:
1. **401 Unauthorized**: Check API key
2. **404 Not Found**: Ensure API file is uploaded to correct path
3. **Image not showing**: Verify image URL is publicly accessible
4. **Duplicate artworks**: API checks for existing IDs to prevent duplicates

### Support:
- Check API response in webhook logs
- Verify image URLs are accessible
- Test API manually with curl command above
