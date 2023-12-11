const userWithAddress = {
    name: 'User',
    email: 'user@email.com',
    address: 'Museu de Arte de São Paulo, Avenida Paulista 1578, Cerqueira César, São Paulo - SP, 01310-200, Brasil',
    location: {
        coordinates: [
        ],
    },
    regions: [],
    createdAt: '2023-12-04T21:57:44.330Z',
    updatedAt: '2023-12-05T02:44:27.571Z',
} as any

const userWithCoordinates = {
    name: 'User',
    email: 'user@email.com',
    address: '',
    location: {
        coordinates: [5.0504702, 47.2808882],
    },
    regions: [],
    createdAt: '2023-12-04T21:57:44.330Z',
    updatedAt: '2023-12-05T02:44:27.571Z',
} as any

const addressToGenerateCoordinates = {
    name: 'User',
    email: 'user@email.com',
    address: 'Museu de Arte de São Paulo, Avenida Paulista 1578, Cerqueira César, São Paulo - SP, 01310-200, Brasil',
    location: {
        coordinates: [-46.6559605, -23.5615088],
    },
    regions: [],
    createdAt: '2023-12-04T21:57:44.330Z',
    updatedAt: '2023-12-05T02:44:27.571Z',
} as any

const coordinatesToGenerateAddress = {
    name: 'User',
    email: 'user@email.com',
    address: 'Eiffel, Boulevard Eiffel, 21600 Longvic, France',
    location: {
        coordinates: [5.0504702, 47.2808882],
    },
    regions: [],
    createdAt: '2023-12-04T21:57:44.330Z',
    updatedAt: '2023-12-05T02:44:27.571Z',
} as any

const users = [
    {
        name: 'User One',
        email: 'userone@email.com',
        address: 'User Street, 123',
        location: {
            coordinates: [],
            type: 'Point'
        }
    }, {
        name: 'User Two',
        email: 'usertwo@email.com',
        address: '',
        location: {
            coordinates: [-46.6863254, -23.6607362],
            type: 'Point'
        }
    }] as any

const user = {
    name: 'User',
    email: 'user@email.com',
    address: 'User Street, 123',
    location: {
        coordinates: [],
        type: 'Point'
    }
} as any



export {
    userWithAddress,
    userWithCoordinates,
    addressToGenerateCoordinates,
    coordinatesToGenerateAddress,
    users,
    user
}