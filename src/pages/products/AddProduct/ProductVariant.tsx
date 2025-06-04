import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ProductVariant = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl pl-4 pr-4 space-y-4 text-left">
                <div className="w-100">
                    <Label htmlFor="variantoptions" className="font-bold text-left">
                        Variant Options
                    </Label>
                    <Input id="variantoptions" type="text" className="h-9 text-sm" placeholder="Enter variant options" />
                </div>
                <div className="w-100">
                    <Label htmlFor="variantpricing" className="font-bold text-left">
                        Variant Pricing
                    </Label>
                    <Input id="variantpricing" type="number" className="h-9 text-sm" placeholder="Enter variant pricing" />
                </div>
                <div className="w-100">
                    <Label htmlFor="variantstock" className="font-bold text-left">
                        Variant Stock
                    </Label>
                    <Input id="variantstock" type="number" className="h-9 text-sm" placeholder="Enter variant stock" />
                </div>
            </div>
        </div>)
}

export default ProductVariant;