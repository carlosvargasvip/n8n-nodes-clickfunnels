# n8n-nodes-clickfunnels

[![npm version](https://badge.fury.io/js/n8n-nodes-clickfunnels.svg)](https://badge.fury.io/js/n8n-nodes-clickfunnels)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is an n8n community node that integrates with the [ClickFunnels 2.0 API](https://developers.myclickfunnels.com/).

ClickFunnels is a sales funnel builder that helps businesses market, sell, and deliver products online.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Via n8n Community Nodes

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-clickfunnels`
4. Agree to the risks and select **Install**

### Via npm

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-clickfunnels
```

## Credentials

To use this node, you need a ClickFunnels API Token:

1. Log in to your ClickFunnels account
2. Go to **Account Settings > API Tokens**
3. Create a new API token
4. Copy the token and use it in n8n

The node will automatically fetch your available Teams and Workspaces using the API token.

## Supported Resources & Operations

| Resource | Operations |
|----------|------------|
| **Contact** | Create, Get, Get Many, Update, Delete, Apply Tag, Remove Tag |
| **Tag** | Create, Get Many, Delete |
| **Order** | Get, Get Many |
| **Product** | Create, Get, Get Many, Update, Delete |
| **Course** | Get, Get Many |
| **Enrollment** | Create, Get, Get Many |
| **Funnel** | Get, Get Many |
| **Page** | Get, Get Many |
| **Webhook** | Create, Get, Get Many, Update, Delete |
| **Form** | Get, Get Many |
| **Form Submission** | Get, Get Many |
| **Image** | Create, Get, Get Many, Update, Delete |
| **Segment** | Get, Get Many |
| **Shipping Profile** | Create, Get, Get Many, Update, Delete |
| **Shipping Rate** | Create, Get, Get Many, Update, Delete |
| **Shipping Zone** | Create, Get, Get Many, Update, Delete |
| **Shipping Package** | Create, Get, Get Many, Update, Delete |
| **Team** | Get, Get Many |
| **Workspace** | Get, Get Many |

## Usage

1. Add the **ClickFunnels** node to your workflow
2. Create new credentials with your API Token
3. Select a **Team** from the dropdown (fetched automatically)
4. Select a **Workspace** from the dropdown (fetched based on team)
5. Choose a **Resource** (Contact, Order, Product, etc.)
6. Choose an **Operation** (Create, Get, Update, etc.)
7. Configure the operation parameters

### Example: Create a Contact

1. Select Team and Workspace
2. Resource: **Contact**
3. Operation: **Create**
4. Enter the email address
5. Optionally add first name, last name, phone, etc.

### Example: List All Contacts

1. Select Team and Workspace
2. Resource: **Contact**
3. Operation: **Get Many**
4. Enable **Return All** to fetch all contacts (handles pagination automatically)

## Pagination

The node automatically handles cursor-based pagination for all "Get Many" operations using the `Pagination-Next` header from the API response. When "Return All" is enabled, it will fetch all available records.

## API Reference

This node uses the [ClickFunnels 2.0 API](https://developers.myclickfunnels.com/reference/introduction).

### API Endpoints

- **Accounts API**: `https://accounts.myclickfunnels.com/api/v2` - For Teams and Workspaces
- **Workspace API**: `https://{subdomain}.myclickfunnels.com/api/v2` - For all other resources

## Compatibility

- n8n version: 1.0.0+
- Node.js version: 18.0.0+

## Development

```bash
# Clone the repository
git clone https://github.com/carlosvargasvip/n8n-nodes-clickfunnels.git
cd n8n-nodes-clickfunnels

# Install dependencies
npm install

# Build
npm run build

# Link for local development
npm link
cd ~/.n8n/nodes
npm link n8n-nodes-clickfunnels
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [ClickFunnels API Documentation](https://developers.myclickfunnels.com/reference/introduction)

## License

[MIT](LICENSE.md)

## Author

[carlosvargasvip](https://github.com/carlosvargasvip)
