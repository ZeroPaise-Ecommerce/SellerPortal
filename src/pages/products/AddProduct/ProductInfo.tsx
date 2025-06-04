import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ProductInfo = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl pl-4 pr-4 space-y-4 text-left">
                <div className="w-100">
                    <Label htmlFor="productName" className="font-bold text-left">
                        Product Name
                    </Label>
                    <Input id="productName" type="text" className="h-9 text-sm" placeholder="Enter product name" maxLength={200} />
                </div>
                <div className="w-100">
                    <Label htmlFor="productSKU" className="font-bold text-left">
                        Product SKU
                    </Label>
                    <Input id="productSKU" type="text" className="h-9 text-sm" placeholder="Enter product SKU" />
                </div>

                <div className="w-100">
                    <Label htmlFor="reason" className="font-bold">
                        Product Type
                    </Label>
                    <Select value={'Electronics'}>
                        <SelectTrigger className="w-[100%] h-9">
                            <SelectValue placeholder="Electronics" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Electronics">Electronics</SelectItem>
                                <SelectItem value="Home">Home</SelectItem>
                                <SelectItem value="Grocery">Grocery</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-100">
                    <Label htmlFor="reason" className="font-bold">
                        Category
                    </Label>
                    <Select value={'all'}>
                        <SelectTrigger className="w-[100%] h-9">
                            <SelectValue placeholder="all" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Electronics">Electronics</SelectItem>
                                <SelectItem value="Home">Home</SelectItem>
                                <SelectItem value="Grocery">Grocery</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-100">
                    <Label htmlFor="brand" className="font-bold">
                        Brand
                    </Label>
                    <Select value={'LG'}>
                        <SelectTrigger className="w-[100%] h-9">
                            <SelectValue placeholder="Electronics" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="LG">LG</SelectItem>
                                <SelectItem value="BOSCH">BOSCH</SelectItem>
                                <SelectItem value="Lenova">Lenova</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-100">
                    <Label htmlFor="description" className="font-bold">
                        Description
                    </Label>
                    <Textarea id="description" />
                </div>

                <div className="w-100">
                    <Label htmlFor="sdescription" className="font-bold">
                        Short Description
                    </Label>
                    <Textarea id="sdescription" />
                </div>

            </div>
        </div>
    )
}

export default ProductInfo;